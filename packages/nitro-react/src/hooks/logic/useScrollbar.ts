import { type PointerEvent as ReactPointerEvent, type RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type ScrollbarOrientation = 'vertical' | 'horizontal';

export interface UseScrollbarOptions {
    orientation: ScrollbarOrientation;
    /** Element whose own size changes (e.g. a grid growing as more items load) should also trigger a re-measure, beyond the viewport's own resize. */
    contentRef?: RefObject<HTMLElement | null>;
    /** Px scrolled per arrow-button step/hold-tick. */
    step?: number;
    /** Thumb never shrinks below this, in px, so it stays grabbable on long lists. */
    minThumbSize?: number;
    /** Distance (px) from an edge that still counts as "reached" it — use a positive value to fire before the user hits the hard edge. */
    reachThreshold?: number;
    onReachStart?: () => void;
    onReachEnd?: () => void;
}

export interface UseScrollbarResult {
    trackRef: RefObject<HTMLDivElement | null>;
    /** Whether the content actually overflows the viewport — when false the thumb fills the whole track and both buttons are disabled. */
    overflowing: boolean;
    canScrollBackward: boolean;
    canScrollForward: boolean;
    isDragging: boolean;
    thumbSize: number;
    thumbOffset: number;
    onThumbPointerDown: (event: ReactPointerEvent<HTMLElement>) => void;
    onTrackPointerDown: (event: ReactPointerEvent<HTMLElement>) => void;
    onStepBackwardPointerDown: (event: ReactPointerEvent<HTMLElement>) => void;
    onStepForwardPointerDown: (event: ReactPointerEvent<HTMLElement>) => void;
}

const DEFAULT_STEP = 40;
const DEFAULT_MIN_THUMB_SIZE = 20;
const HOLD_DELAY = 350;
const HOLD_INTERVAL = 50;

/**
 * Drives a skinned scrollbar's thumb geometry, dragging, track-click paging, and arrow-button
 * stepping (incl. press-and-hold repeat) against a real scrollable `viewportRef`. Position and
 * size are derived from the viewport's own scroll state on every 'scroll'/resize, so the native
 * element (wheel, touch, keyboard, momentum) stays the single source of truth — this composes
 * directly with virtualized lists/grids (e.g. @tanstack/react-virtual) that scroll the same node.
 */
export const useScrollbar = (viewportRef: RefObject<HTMLElement | null>, options: UseScrollbarOptions): UseScrollbarResult => {
    const { orientation, contentRef, step = DEFAULT_STEP, minThumbSize = DEFAULT_MIN_THUMB_SIZE, reachThreshold = 0, onReachStart, onReachEnd } = options;
    const isVertical = orientation === 'vertical';

    const trackRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef<{ pointerId: number; startClient: number; startScroll: number } | null>(null);
    const holdRef = useRef<{ timeoutId: number; intervalId: number } | null>(null);
    const reachedStartRef = useRef(false);
    const reachedEndRef = useRef(false);

    const [metrics, setMetrics] = useState({ scrollPos: 0, scrollSize: 0, clientSize: 0, trackSize: 0 });
    const [isDragging, setIsDragging] = useState(false);

    const measure = useCallback(() => {
        const viewport = viewportRef.current;
        const track = trackRef.current;

        if (!viewport) return;

        const scrollPos = isVertical ? viewport.scrollTop : viewport.scrollLeft;
        const scrollSize = isVertical ? viewport.scrollHeight : viewport.scrollWidth;
        const clientSize = isVertical ? viewport.clientHeight : viewport.clientWidth;
        const trackSize = track ? (isVertical ? track.clientHeight : track.clientWidth) : clientSize;

        setMetrics({ scrollPos, scrollSize, clientSize, trackSize });

        const remainingForward = scrollSize - clientSize - scrollPos;

        if (onReachEnd) {
            if (remainingForward <= reachThreshold) {
                if (!reachedEndRef.current) {
                    reachedEndRef.current = true;
                    onReachEnd();
                }
            }
            else {
                reachedEndRef.current = false;
            }
        }

        if (onReachStart) {
            if (scrollPos <= reachThreshold) {
                if (!reachedStartRef.current) {
                    reachedStartRef.current = true;
                    onReachStart();
                }
            }
            else {
                reachedStartRef.current = false;
            }
        }
    }, [viewportRef, isVertical, reachThreshold, onReachStart, onReachEnd]);

    useEffect(() => {
        const viewport = viewportRef.current;

        if (!viewport) return;

        measure();

        const handleScroll = () => measure();

        viewport.addEventListener('scroll', handleScroll, { passive: true });

        const resizeObserver = new ResizeObserver(() => measure());

        resizeObserver.observe(viewport);

        if (trackRef.current) resizeObserver.observe(trackRef.current);
        if (contentRef?.current) resizeObserver.observe(contentRef.current);

        return () => {
            viewport.removeEventListener('scroll', handleScroll);
            resizeObserver.disconnect();
        };
    }, [viewportRef, contentRef, measure]);

    const { scrollPos, scrollSize, clientSize, trackSize } = metrics;
    const overflowing = scrollSize > clientSize + 1;
    const maxScroll = Math.max(scrollSize - clientSize, 0);

    const thumbSize = overflowing ? Math.max(minThumbSize, Math.round((clientSize / scrollSize) * trackSize)) : trackSize;
    const thumbOffset = overflowing && maxScroll > 0 ? Math.round((trackSize - thumbSize) * (scrollPos / maxScroll)) : 0;

    const canScrollBackward = scrollPos > 0.5;
    const canScrollForward = scrollPos < maxScroll - 0.5;

    const scrollTo = useCallback((pos: number, smooth?: boolean) => {
        const viewport = viewportRef.current;

        if (!viewport) return;

        const size = isVertical ? viewport.scrollHeight - viewport.clientHeight : viewport.scrollWidth - viewport.clientWidth;
        const clamped = Math.min(Math.max(pos, 0), Math.max(size, 0));

        viewport.scrollTo(isVertical ? { top: clamped, behavior: smooth ? 'smooth' : 'auto' } : { left: clamped, behavior: smooth ? 'smooth' : 'auto' });
    }, [viewportRef, isVertical]);

    const scrollBy = useCallback((delta: number, smooth?: boolean) => {
        const viewport = viewportRef.current;

        if (!viewport) return;

        viewport.scrollBy(isVertical ? { top: delta, behavior: smooth ? 'smooth' : 'auto' } : { left: delta, behavior: smooth ? 'smooth' : 'auto' });
    }, [viewportRef, isVertical]);

    const onThumbPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
        if (event.button !== 0 || !overflowing) return;

        const viewport = viewportRef.current;

        if (!viewport) return;

        event.preventDefault();
        event.stopPropagation();

        const target = event.currentTarget;

        target.setPointerCapture(event.pointerId);

        dragRef.current = {
            pointerId: event.pointerId,
            startClient: isVertical ? event.clientY : event.clientX,
            startScroll: isVertical ? viewport.scrollTop : viewport.scrollLeft,
        };

        setIsDragging(true);

        const handleMove = (moveEvent: PointerEvent) => {
            const drag = dragRef.current;

            if (!drag || moveEvent.pointerId !== drag.pointerId) return;

            const trackFree = trackSize - thumbSize;

            if (trackFree <= 0) return;

            const currentClient = isVertical ? moveEvent.clientY : moveEvent.clientX;
            const deltaClient = currentClient - drag.startClient;
            const deltaScroll = (deltaClient / trackFree) * maxScroll;

            scrollTo(drag.startScroll + deltaScroll);
        };

        const stop = (upEvent: PointerEvent) => {
            if (dragRef.current?.pointerId !== upEvent.pointerId) return;

            dragRef.current = null;
            setIsDragging(false);
            target.removeEventListener('pointermove', handleMove);
            target.removeEventListener('pointerup', stop);
            target.removeEventListener('pointercancel', stop);
        };

        target.addEventListener('pointermove', handleMove);
        target.addEventListener('pointerup', stop);
        target.addEventListener('pointercancel', stop);
    }, [viewportRef, isVertical, overflowing, trackSize, thumbSize, maxScroll, scrollTo]);

    const onTrackPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
        if (event.button !== 0 || !overflowing) return;
        if (event.target !== event.currentTarget) return; // a click that landed on the thumb is handled by onThumbPointerDown

        const track = trackRef.current;

        if (!track) return;

        const rect = track.getBoundingClientRect();
        const clickPos = isVertical ? event.clientY - rect.top : event.clientX - rect.left;
        const direction = clickPos < thumbOffset ? -1 : clickPos > thumbOffset + thumbSize ? 1 : 0;

        if (direction === 0) return;

        scrollBy(direction * clientSize * 0.9, true);
    }, [isVertical, overflowing, thumbOffset, thumbSize, clientSize, scrollBy]);

    const stopHold = useCallback(() => {
        const hold = holdRef.current;

        if (!hold) return;

        window.clearTimeout(hold.timeoutId);
        window.clearInterval(hold.intervalId);
        holdRef.current = null;
    }, []);

    useEffect(() => stopHold, [stopHold]);

    const makeStepHandler = useCallback((direction: -1 | 1) => (event: ReactPointerEvent<HTMLElement>) => {
        if (event.button !== 0) return;

        event.preventDefault();

        const run = () => scrollBy(direction * step);

        run();

        const target = event.currentTarget;

        target.setPointerCapture(event.pointerId);

        const timeoutId = window.setTimeout(() => {
            const intervalId = window.setInterval(run, HOLD_INTERVAL);

            holdRef.current = { timeoutId: 0, intervalId };
        }, HOLD_DELAY);

        holdRef.current = { timeoutId, intervalId: 0 };

        const stop = () => {
            stopHold();
            target.removeEventListener('pointerup', stop);
            target.removeEventListener('pointercancel', stop);
            target.removeEventListener('pointerleave', stop);
        };

        target.addEventListener('pointerup', stop);
        target.addEventListener('pointercancel', stop);
        target.addEventListener('pointerleave', stop);
    }, [scrollBy, step, stopHold]);

    const onStepBackwardPointerDown = useMemo(() => makeStepHandler(-1), [makeStepHandler]);
    const onStepForwardPointerDown = useMemo(() => makeStepHandler(1), [makeStepHandler]);

    return {
        trackRef,
        overflowing,
        canScrollBackward,
        canScrollForward,
        isDragging,
        thumbSize,
        thumbOffset,
        onThumbPointerDown,
        onTrackPointerDown,
        onStepBackwardPointerDown,
        onStepForwardPointerDown,
    };
};
