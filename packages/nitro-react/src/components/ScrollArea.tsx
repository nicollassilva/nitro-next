import { forwardRef, type HTMLAttributes, useRef } from 'react';

import { cn } from '#base/utils';

import { ScrollbarHorizontal } from './ScrollbarHorizontal';
import { ScrollbarVertical } from './ScrollbarVertical';

type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both';

interface ScrollAreaProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onScroll'> {
    className?: string;
    /** Which axis/axes get a skinned scrollbar. Defaults to `'vertical'`, the common case for grids/lists. */
    orientation?: ScrollAreaOrientation;
    /** Scrollbar skin variant, forwarded to whichever scrollbar(s) are rendered. */
    variant?: string;
    /** Extra classes for the scrolling viewport (the element with `overflow`). */
    viewportClassName?: string;
    /** Extra classes for the content wrapper inside the viewport. */
    contentClassName?: string;
    /** Recolors the thumb's tintable art at runtime (see `#base/pixiTint`). */
    tintColor?: string;
    /** Px scrolled per arrow-button step/hold-tick. */
    step?: number;
    /** Thumb never shrinks below this, in px. */
    minThumbSize?: number;
    /**
     * Distance (px) from an edge that still counts as "reached" it — pass a positive value to
     * trigger infinite-scroll loading a bit before the user hits the hard edge. Only wired up for
     * the vertical axis when `orientation="both"`, since that's the overwhelmingly common case.
     */
    reachThreshold?: number;
    onReachStart?: () => void;
    onReachEnd?: () => void;
}

/**
 * Drop-in scrollable container: a native `overflow`-scrolling viewport (its own scrollbar hidden)
 * paired with a skinned `ScrollbarVertical`/`ScrollbarHorizontal`. Works equally well with plain
 * content or a virtualized grid/list (e.g. @tanstack/react-virtual) — pass `onReachEnd` to trigger
 * loading more as the user nears the bottom.
 */
export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
    ({
        className,
        orientation = 'vertical',
        variant,
        viewportClassName,
        contentClassName,
        tintColor,
        step,
        minThumbSize,
        reachThreshold,
        onReachStart,
        onReachEnd,
        children,
        ...props
    }, ref) => {
        const viewportRef = useRef<HTMLDivElement>(null);
        const contentRef = useRef<HTMLDivElement>(null);

        const showVertical = orientation === 'vertical' || orientation === 'both';
        const showHorizontal = orientation === 'horizontal' || orientation === 'both';

        return (
            <div ref={ref} className={cn('flex size-full min-h-0 min-w-0 gap-0.5', className)} {...props}>
                <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                    <div
                        ref={viewportRef}
                        className={cn(
                            'min-h-0 min-w-0 flex-1',
                            showVertical && 'overflow-y-auto',
                            showHorizontal && 'overflow-x-auto',
                            '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
                            viewportClassName
                        )}
                    >
                        <div ref={contentRef} className={contentClassName}>
                            {children}
                        </div>
                    </div>
                </div>
                {showVertical && (
                    <ScrollbarVertical
                        viewportRef={viewportRef}
                        contentRef={contentRef}
                        variant={variant as undefined}
                        tintColor={tintColor}
                        step={step}
                        minThumbSize={minThumbSize}
                        reachThreshold={reachThreshold}
                        onReachStart={onReachStart}
                        onReachEnd={onReachEnd}
                    />
                )}
                {showHorizontal && (
                    <ScrollbarHorizontal
                        viewportRef={viewportRef}
                        contentRef={contentRef}
                        variant={variant as undefined}
                        tintColor={tintColor}
                        step={step}
                        minThumbSize={minThumbSize}
                        reachThreshold={orientation === 'both' ? undefined : reachThreshold}
                        onReachStart={orientation === 'both' ? undefined : onReachStart}
                        onReachEnd={orientation === 'both' ? undefined : onReachEnd}
                    />
                )}
            </div>
        );
    }
);

ScrollArea.displayName = 'ScrollArea';
