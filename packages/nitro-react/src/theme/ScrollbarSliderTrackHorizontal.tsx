import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const scrollbarSliderTrackHorizontalVariantsConfig = {
    variant: {
        // default
        '0': 'inline-block min-w-px min-h-4.25 aria-disabled:pointer-events-none [background-image:var(--scrollbarslidertrackhorizontal-0-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] active:[background-image:var(--scrollbarslidertrackhorizontal-0-default-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarslidertrackhorizontal-0-default-src)] aria-disabled:bg-size-[100%_100%] aria-disabled:bg-no-repeat aria-disabled:[image-rendering:pixelated]',
        // black
        '1': 'inline-block min-w-px min-h-4.25 aria-disabled:pointer-events-none [background-image:var(--scrollbarslidertrackhorizontal-1-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] active:[background-image:var(--scrollbarslidertrackhorizontal-1-default-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarslidertrackhorizontal-1-default-src)] aria-disabled:bg-size-[100%_100%] aria-disabled:bg-no-repeat aria-disabled:[image-rendering:pixelated]',
        // default
        '3': 'inline-block min-w-0.5 min-h-4.25 aria-disabled:pointer-events-none [background-image:var(--scrollbarslidertrackhorizontal-3-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] active:[background-image:var(--scrollbarslidertrackhorizontal-3-default-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarslidertrackhorizontal-3-disabled-src)] aria-disabled:bg-size-[100%_100%] aria-disabled:bg-no-repeat aria-disabled:[image-rendering:pixelated]',
        // default
        '100': '[border-image-source:var(--scrollbarslidertrackhorizontal-100-default-src)] [border-image-slice:0_2_0_2_fill] [border-image-width:0px_2px_0px_2px] nine-slice-border',
        // default
        '200': '[border-image-source:var(--scrollbarslidertrackhorizontal-200-default-src)] [border-image-slice:0_2_0_2_fill] [border-image-width:0px_2px_0px_2px] nine-slice-border',
    },
} as const;

const scrollbarSliderTrackHorizontalVariants = cva(
    '',
    {
        variants: scrollbarSliderTrackHorizontalVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type ScrollbarSliderTrackHorizontalVariantProps = VariantProps<typeof scrollbarSliderTrackHorizontalVariantsConfig>;

interface ScrollbarSliderTrackHorizontalProps extends HTMLAttributes<HTMLDivElement>, ScrollbarSliderTrackHorizontalVariantProps {
    className?: string;
    defaultVariant?: string;
}

export const ScrollbarSliderTrackHorizontal = forwardRef<HTMLDivElement, ScrollbarSliderTrackHorizontalProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('scrollbarSliderTrackHorizontal');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['scrollbarSliderTrackHorizontal']?.[resolvedVariant as string];
        return (
            <div
                ref={ref}
                className={cn(scrollbarSliderTrackHorizontalVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

ScrollbarSliderTrackHorizontal.displayName = 'ScrollbarSliderTrackHorizontal';
