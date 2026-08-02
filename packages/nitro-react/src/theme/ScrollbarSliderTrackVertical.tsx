import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const scrollbarSliderTrackVerticalVariantsConfig = {
    variant: {
        // default
        '0': 'inline-block min-w-4.25 min-h-px aria-disabled:pointer-events-none [background-image:var(--scrollbarslidertrackvertical-0-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] active:[background-image:var(--scrollbarslidertrackvertical-0-default-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarslidertrackvertical-0-default-src)] aria-disabled:bg-size-[100%_100%] aria-disabled:bg-no-repeat aria-disabled:[image-rendering:pixelated]',
        // black
        '1': 'inline-block min-w-4.25 min-h-px aria-disabled:pointer-events-none [background-image:var(--scrollbarslidertrackvertical-1-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] active:[background-image:var(--scrollbarslidertrackvertical-1-default-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarslidertrackvertical-1-default-src)] aria-disabled:bg-size-[100%_100%] aria-disabled:bg-no-repeat aria-disabled:[image-rendering:pixelated]',
        // default
        '3': 'inline-block min-w-4.25 min-h-0.5 aria-disabled:pointer-events-none [background-image:var(--scrollbarslidertrackvertical-3-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] active:[background-image:var(--scrollbarslidertrackvertical-3-default-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarslidertrackvertical-3-disabled-src)] aria-disabled:bg-size-[100%_100%] aria-disabled:bg-no-repeat aria-disabled:[image-rendering:pixelated]',
        // default
        '100': '[border-image-source:var(--scrollbarslidertrackhorizontal-100-default-src)] [border-image-slice:2_0_2_0_fill] [border-image-width:2px_0px_2px_0px] nine-slice-border',
        // default
        '200': '[border-image-source:var(--scrollbarslidertrackhorizontal-200-default-src)] [border-image-slice:3_0_3_0_fill] [border-image-width:3px_0px_3px_0px] nine-slice-border',
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
    defaultVariant?: string;
}

export const ScrollbarSliderTrackVertical = forwardRef<HTMLDivElement, ScrollbarSliderTrackVerticalProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('scrollbarSliderTrackVertical');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['scrollbarSliderTrackVertical']?.[resolvedVariant as string];
        return (
            <div
                ref={ref}
                className={cn(scrollbarSliderTrackVerticalVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

ScrollbarSliderTrackVertical.displayName = 'ScrollbarSliderTrackVertical';
