import { forwardRef, type HTMLAttributes, type RefObject } from 'react';

import { useScrollbar } from '#base/hooks/logic/useScrollbar';
import { cn, cva, type VariantProps } from '#base/utils';

import { ScrollbarSliderBarHorizontal } from './ScrollbarSliderBarHorizontal';
import { ScrollbarSliderButtonLeft } from './ScrollbarSliderButtonLeft';
import { ScrollbarSliderButtonRight } from './ScrollbarSliderButtonRight';
import { ScrollbarSliderTrackHorizontal } from './ScrollbarSliderTrackHorizontal';

const scrollbarHorizontalVariantsConfig = {
    variant: {
        // default — has left/right arrow buttons
        '0': 'min-h-4.25 text-[#000000]',
        // black — has left/right arrow buttons
        '1': 'min-h-4.25 text-[#000000]',
        // default — has left/right arrow buttons
        '3': 'min-h-4.25 text-[#000000]',
        // default — slim, buttonless track
        '100': 'min-h-2.25 text-[#000000]',
        // default — slim, buttonless track
        '200': 'min-h-2.25 text-[#000000]',
    },
} as const;

const scrollbarHorizontalVariants = cva(
    'flex flex-row items-stretch min-w-14',
    {
        variants: scrollbarHorizontalVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type ScrollbarHorizontalVariantProps = VariantProps<typeof scrollbarHorizontalVariantsConfig>;
type ScrollbarHorizontalVariant = NonNullable<ScrollbarHorizontalVariantProps['variant']>;

const buttonedVariants = new Set<ScrollbarHorizontalVariant>(['0', '1', '3']);
const isButtonedVariant = (variant: ScrollbarHorizontalVariant): variant is '0' | '1' | '3' => buttonedVariants.has(variant);

interface ScrollbarHorizontalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onScroll'>, ScrollbarHorizontalVariantProps {
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
    /** Distance (px) from left/right that still counts as "reached" it. */
    reachThreshold?: number;
    onReachStart?: () => void;
    onReachEnd?: () => void;
}

export const ScrollbarHorizontal = forwardRef<HTMLDivElement, ScrollbarHorizontalProps>(
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
        } = useScrollbar(viewportRef, { orientation: 'horizontal', contentRef, step, minThumbSize, reachThreshold, onReachStart, onReachEnd });

        return (
            <div
                ref={ref}
                className={cn(scrollbarHorizontalVariants({ variant }), className)}
                style={style}
                {...props}
            >
                {isButtonedVariant(resolvedVariant) && (
                    <ScrollbarSliderButtonLeft
                        variant={resolvedVariant}
                        aria-disabled={!canScrollBackward}
                        onPointerDown={onStepBackwardPointerDown}
                    />
                )}
                <ScrollbarSliderTrackHorizontal
                    ref={trackRef}
                    variant={variant}
                    className="relative flex-1"
                    onPointerDown={onTrackPointerDown}
                >
                    {overflowing && (
                        <ScrollbarSliderBarHorizontal
                            variant={variant}
                            tintColor={tintColor}
                            className={cn('absolute top-0 h-full touch-none cursor-grab', isDragging && 'cursor-grabbing')}
                            style={{ width: thumbSize, left: thumbOffset }}
                            onPointerDown={onThumbPointerDown}
                        />
                    )}
                </ScrollbarSliderTrackHorizontal>
                {isButtonedVariant(resolvedVariant) && (
                    <ScrollbarSliderButtonRight
                        variant={resolvedVariant}
                        aria-disabled={!canScrollForward}
                        onPointerDown={onStepForwardPointerDown}
                    />
                )}
            </div>
        );
    }
);

ScrollbarHorizontal.displayName = 'ScrollbarHorizontal';
