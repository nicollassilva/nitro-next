import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const scrollbarSliderButtonRightVariantsConfig = {
    variant: {
        // default
        '0': 'inline-block min-w-4 min-h-4.25 aria-disabled:pointer-events-none [background-image:var(--scrollbarsliderbuttonright-src)] bg-position-[-0px_-0px] bg-size-[160px_17px] bg-no-repeat [image-rendering:pixelated] active:[background-image:var(--scrollbarsliderbuttonright-src)] active:bg-position-[-16px_-0px] active:bg-size-[160px_17px] active:bg-no-repeat active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarsliderbuttonright-src)] aria-disabled:bg-position-[-32px_-0px] aria-disabled:bg-size-[160px_17px] aria-disabled:bg-no-repeat aria-disabled:[image-rendering:pixelated]',
        // black
        '1': 'inline-block min-w-4 min-h-4.25 aria-disabled:pointer-events-none [background-image:var(--scrollbarsliderbuttonright-src)] bg-position-[-48px_-0px] bg-size-[160px_17px] bg-no-repeat [image-rendering:pixelated] active:[background-image:var(--scrollbarsliderbuttonright-src)] active:bg-position-[-64px_-0px] active:bg-size-[160px_17px] active:bg-no-repeat active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarsliderbuttonright-src)] aria-disabled:bg-position-[-80px_-0px] aria-disabled:bg-size-[160px_17px] aria-disabled:bg-no-repeat aria-disabled:[image-rendering:pixelated]',
        // default
        '3': 'inline-block min-w-4 min-h-4.25 aria-disabled:pointer-events-none [background-image:var(--scrollbarsliderbuttonright-src)] bg-position-[-96px_-0px] bg-size-[160px_17px] bg-no-repeat [image-rendering:pixelated] hover:[background-image:var(--scrollbarsliderbuttonright-src)] hover:bg-position-[-112px_-0px] hover:bg-size-[160px_17px] hover:bg-no-repeat hover:[image-rendering:pixelated] active:[background-image:var(--scrollbarsliderbuttonright-src)] active:bg-position-[-128px_-0px] active:bg-size-[160px_17px] active:bg-no-repeat active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarsliderbuttonright-src)] aria-disabled:bg-position-[-144px_-0px] aria-disabled:bg-size-[160px_17px] aria-disabled:bg-no-repeat aria-disabled:[image-rendering:pixelated]',
    },
} as const;

const scrollbarSliderButtonRightVariants = cva(
    '',
    {
        variants: scrollbarSliderButtonRightVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type ScrollbarSliderButtonRightVariantProps = VariantProps<typeof scrollbarSliderButtonRightVariantsConfig>;

interface ScrollbarSliderButtonRightProps extends HTMLAttributes<HTMLDivElement>, ScrollbarSliderButtonRightVariantProps {
    className?: string;
    defaultVariant?: string;
}

export const ScrollbarSliderButtonRight = forwardRef<HTMLDivElement, ScrollbarSliderButtonRightProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('scrollbarSliderButtonRight');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['scrollbarSliderButtonRight']?.[resolvedVariant as string];
        return (
            <div
                ref={ref}
                className={cn(scrollbarSliderButtonRightVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

ScrollbarSliderButtonRight.displayName = 'ScrollbarSliderButtonRight';
