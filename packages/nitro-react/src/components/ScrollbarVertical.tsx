import { forwardRef, type HTMLAttributes, type RefObject } from 'react';

import { useScrollbar } from '#base/hooks/logic/useScrollbar';
import { cn, cva, type VariantProps } from '#base/utils';

import { ScrollbarSliderBarVertical } from './ScrollbarSliderBarVertical';
import { ScrollbarSliderButtonDown } from './ScrollbarSliderButtonDown';
import { ScrollbarSliderButtonUp } from './ScrollbarSliderButtonUp';
import { ScrollbarSliderTrackVertical } from './ScrollbarSliderTrackVertical';

const scrollbarVerticalVariantsConfig = {
    variant: {
        // default — has up/down arrow buttons
        '0': 'min-w-4.25 text-[#000000]',
        // black — has up/down arrow buttons
        '1': 'min-w-4.25 text-[#000000]',
        // default — has up/down arrow buttons
        '3': 'min-w-4.25 text-[#000000]',
        // default — slim, buttonless track
        '100': 'min-w-2.25 text-[#000000]',
        // default — slim, buttonless track
        '200': 'min-w-2.25 text-[#000000]',
    },
} as const;

const scrollbarVerticalVariants = cva(
    'flex flex-col items-stretch min-h-14',
    {
        variants: scrollbarVerticalVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type ScrollbarVerticalVariantProps = VariantProps<typeof scrollbarVerticalVariantsConfig>;
type ScrollbarVerticalVariant = NonNullable<ScrollbarVerticalVariantProps['variant']>;

const buttonedVariants = new Set<ScrollbarVerticalVariant>(['0', '1', '3']);
const isButtonedVariant = (variant: ScrollbarVerticalVariant): variant is '0' | '1' | '3' => buttonedVariants.has(variant);

interface ScrollbarVerticalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onScroll'>, ScrollbarVerticalVariantProps {
    className?: string;
    /** The scrollable element this scrollbar drives — its native scroll (wheel/touch/keyboard) stays authoritative, this just adds a skinned thumb/track/buttons on top. */
    viewportRef: RefObject<HTMLElement | null>;
    /** Optional element to also watch for size changes (e.g. a grid that grows as more items load) beyond the viewport's own resize. */
    contentRef?: RefObject<HTMLElement | null>;
    /** Recolors the thumb's tintable art at runtime (see `#base/pixiTint`). */
    tintColor?: string;
    /** Px scrolled per arrow-button step/hold-tick. */
    step?: number;
    /** Thumb never shrinks below this, in px. */
    minThumbSize?: number;
    /** Distance (px) from top/bottom that still counts as "reached" it. */
    reachThreshold?: number;
    onReachStart?: () => void;
    onReachEnd?: () => void;
}

export const ScrollbarVertical = forwardRef<HTMLDivElement, ScrollbarVerticalProps>(
    ({ className, variant, viewportRef, contentRef, tintColor, step, minThumbSize, reachThreshold, onReachStart, onReachEnd, style, ...props }, ref) => {
        const resolvedVariant = variant ?? '0';

        const {
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
        } = useScrollbar(viewportRef, { orientation: 'vertical', contentRef, step, minThumbSize, reachThreshold, onReachStart, onReachEnd });

        return (
            <div
                ref={ref}
                className={cn(scrollbarVerticalVariants({ variant }), className)}
                style={style}
                {...props}
            >
                {isButtonedVariant(resolvedVariant) && (
                    <ScrollbarSliderButtonUp
                        variant={resolvedVariant}
                        aria-disabled={!canScrollBackward}
                        onPointerDown={onStepBackwardPointerDown}
                    />
                )}
                <ScrollbarSliderTrackVertical
                    ref={trackRef}
                    variant={variant}
                    className="relative flex-1"
                    onPointerDown={onTrackPointerDown}
                >
                    {overflowing && (
                        <ScrollbarSliderBarVertical
                            variant={variant}
                            tintColor={tintColor}
                            className={cn('absolute left-0 w-full touch-none cursor-grab', isDragging && 'cursor-grabbing')}
                            style={{ height: thumbSize, top: thumbOffset }}
                            onPointerDown={onThumbPointerDown}
                        />
                    )}
                </ScrollbarSliderTrackVertical>
                {isButtonedVariant(resolvedVariant) && (
                    <ScrollbarSliderButtonDown
                        variant={resolvedVariant}
                        aria-disabled={!canScrollForward}
                        onPointerDown={onStepForwardPointerDown}
                    />
                )}
            </div>
        );
    }
);

ScrollbarVertical.displayName = 'ScrollbarVertical';
