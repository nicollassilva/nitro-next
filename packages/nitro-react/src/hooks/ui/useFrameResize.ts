import { type CSSProperties, type PointerEvent as ReactPointerEvent, type RefObject, useRef, useState } from 'react';

import { clearStoredFrameSize, type FrameSize, getStoredFrameSize, setStoredFrameSize } from '#base/utils';

export type FrameResizeDirection = 'x' | 'y' | 'all' | 'none';

type ResizeState = {
    pointerId: number;
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    minWidth: number;
    minHeight: number;
    maxWidth: number;
    maxHeight: number;
    moved: boolean;
};

type TapState = {
    time: number;
    x: number;
    y: number;
};

const MIN_SIZE = 50;

// a finger never lands perfectly still, so a few pixels of jitter must still count as a tap
const DRAG_THRESHOLD = 4;
const DOUBLE_TAP_DELAY = 300;
const DOUBLE_TAP_DISTANCE = 24;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const distance = (x: number, y: number, toX: number, toY: number) => Math.hypot(x - toX, y - toY);

export const useFrameResize = (id: string | undefined, frameRef: RefObject<HTMLElement | null>, direction: FrameResizeDirection = 'all') => {
    const resizeStateRef = useRef<ResizeState | null>(null);
    const latestSizeRef = useRef<FrameSize | null>(null);
    const lastTapRef = useRef<TapState | null>(null);

    const [size, setSize] = useState<FrameSize | null>(() => (id && getStoredFrameSize(id)) || null);

    const endGesture = (event: ReactPointerEvent<HTMLElement>) => {
        resizeStateRef.current = null;

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }

        if (id && latestSizeRef.current) setStoredFrameSize(id, latestSizeRef.current);
    }

    const resetSize = () => {
        // the original size lives in the frame's own classes, so dropping the inline
        // size is all it takes to hand the sizing back to them
        latestSizeRef.current = null;

        setSize(null);

        if (id) clearStoredFrameSize(id);
    }

    const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
        if (event.button !== 0 || direction === 'none') return;

        // a second finger must not hijack a resize that is already in flight
        if (resizeStateRef.current) return;

        const node = frameRef.current;

        if (!node) return;

        // touch pointers are not cancelable while touch-action is none, and cancelling
        // them anyway only earns a console warning
        if (event.cancelable) event.preventDefault();

        const rect = node.getBoundingClientRect();
        const computed = window.getComputedStyle(node);

        // only a real drag may persist a size — a plain tap has to leave the stored value alone
        latestSizeRef.current = null;

        resizeStateRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            startWidth: rect.width,
            startHeight: rect.height,
            // the variant classes carry the real minimums (min-w-*/min-h-*); honouring them
            // keeps the tracked size in sync with what the browser actually lays out
            minWidth: Math.max(parseFloat(computed.minWidth) || 0, MIN_SIZE),
            minHeight: Math.max(parseFloat(computed.minHeight) || 0, MIN_SIZE),
            maxWidth: Math.max(rect.width, window.innerWidth - rect.left),
            maxHeight: Math.max(rect.height, window.innerHeight - rect.top),
            moved: false,
        };

        event.currentTarget.setPointerCapture(event.pointerId);
    }

    const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
        const resizeState = resizeStateRef.current;

        if (!resizeState || event.pointerId !== resizeState.pointerId) return;

        if (!resizeState.moved) {
            if (distance(event.clientX, event.clientY, resizeState.startX, resizeState.startY) < DRAG_THRESHOLD) return;

            resizeState.moved = true;
        }

        const width = direction === 'y'
            ? resizeState.startWidth
            : clamp(resizeState.startWidth + (event.clientX - resizeState.startX), resizeState.minWidth, resizeState.maxWidth);

        const height = direction === 'x'
            ? resizeState.startHeight
            : clamp(resizeState.startHeight + (event.clientY - resizeState.startY), resizeState.minHeight, resizeState.maxHeight);

        const next: FrameSize = { width: Math.round(width), height: Math.round(height) };

        latestSizeRef.current = next;

        setSize((current) => (current && current.width === next.width && current.height === next.height ? current : next));
    }

    const handlePointerUp = (event: ReactPointerEvent<HTMLElement>) => {
        const resizeState = resizeStateRef.current;

        if (!resizeState || event.pointerId !== resizeState.pointerId) return;

        endGesture(event);

        if (resizeState.moved) {
            // a resize breaks any tap sequence that was building up
            lastTapRef.current = null;

            return;
        }

        // dblclick is not dispatched reliably for touch, so the second tap is tracked by
        // hand — mouse, pen and touch then all reset through the same path
        const lastTap = lastTapRef.current;

        if (lastTap
            && (event.timeStamp - lastTap.time) <= DOUBLE_TAP_DELAY
            && distance(event.clientX, event.clientY, lastTap.x, lastTap.y) <= DOUBLE_TAP_DISTANCE) {
            lastTapRef.current = null;

            resetSize();

            return;
        }

        lastTapRef.current = { time: event.timeStamp, x: event.clientX, y: event.clientY };
    }

    const handlePointerCancel = (event: ReactPointerEvent<HTMLElement>) => {
        const resizeState = resizeStateRef.current;

        if (!resizeState || event.pointerId !== resizeState.pointerId) return;

        // an interrupted gesture keeps whatever size is on screen, but it is never a tap
        endGesture(event);

        lastTapRef.current = null;
    }

    const style: CSSProperties = size ? {
        width: size.width,
        height: size.height
    } : {};

    return {
        style,
        onScalerPointerDown: handlePointerDown,
        onScalerPointerMove: handlePointerMove,
        onScalerPointerUp: handlePointerUp,
        onScalerPointerCancel: handlePointerCancel,
    };
};
