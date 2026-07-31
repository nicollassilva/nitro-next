import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const scrollbarSliderTrackVerticalVariantsConfig = {
    variant: {
        // default
        '0': 'inline-block min-w-[17px] min-h-[1px] aria-disabled:pointer-events-none [background-image:var(--scrollbarslidertrackvertical-0-default-src)] [background-size:100%_100%] [background-repeat:no-repeat] [image-rendering:pixelated] active:[background-image:var(--scrollbarslidertrackvertical-0-default-src)] active:[background-size:100%_100%] active:[background-repeat:no-repeat] active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarslidertrackvertical-0-default-src)] aria-disabled:[background-size:100%_100%] aria-disabled:[background-repeat:no-repeat] aria-disabled:[image-rendering:pixelated]',
        // black
        '1': 'inline-block min-w-[17px] min-h-[1px] aria-disabled:pointer-events-none [background-image:var(--scrollbarslidertrackvertical-1-default-src)] [background-size:100%_100%] [background-repeat:no-repeat] [image-rendering:pixelated] active:[background-image:var(--scrollbarslidertrackvertical-1-default-src)] active:[background-size:100%_100%] active:[background-repeat:no-repeat] active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarslidertrackvertical-1-default-src)] aria-disabled:[background-size:100%_100%] aria-disabled:[background-repeat:no-repeat] aria-disabled:[image-rendering:pixelated]',
        // default
        '3': 'inline-block min-w-[17px] min-h-[2px] aria-disabled:pointer-events-none [background-image:var(--scrollbarslidertrackvertical-3-default-src)] [background-size:100%_100%] [background-repeat:no-repeat] [image-rendering:pixelated] active:[background-image:var(--scrollbarslidertrackvertical-3-default-src)] active:[background-size:100%_100%] active:[background-repeat:no-repeat] active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarslidertrackvertical-3-disabled-src)] aria-disabled:[background-size:100%_100%] aria-disabled:[background-repeat:no-repeat] aria-disabled:[image-rendering:pixelated]',
        // default
        '100': '[border-image-source:var(--scrollbarslidertrackhorizontal-100-default-src)] [border-image-slice:2_0_2_0_fill] [border-image-width:2px_0px_2px_0px] [border-image-repeat:stretch]',
        // default
        '200': '[border-image-source:var(--scrollbarslidertrackhorizontal-200-default-src)] [border-image-slice:3_0_3_0_fill] [border-image-width:3px_0px_3px_0px] [border-image-repeat:stretch]',
    },
} as const;

const scrollbarSliderTrackVerticalVariants = cva(
    '',
    {
        variants: scrollbarSliderTrackVerticalVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type ScrollbarSliderTrackVerticalVariantProps = VariantProps<typeof scrollbarSliderTrackVerticalVariantsConfig>;

interface ScrollbarSliderTrackVerticalProps extends HTMLAttributes<HTMLDivElement>, ScrollbarSliderTrackVerticalVariantProps {
    className?: string;
}

export const ScrollbarSliderTrackVertical = forwardRef<HTMLDivElement, ScrollbarSliderTrackVerticalProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(scrollbarSliderTrackVerticalVariants({ variant }), className)}
            {...props}
        />
    )
);

ScrollbarSliderTrackVertical.displayName = 'ScrollbarSliderTrackVertical';
