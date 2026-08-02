import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const scrollbarSliderButtonDownVariantsConfig = {
    variant: {
        // default
        '0': 'inline-block min-w-4.25 min-h-4 aria-disabled:pointer-events-none [background-image:var(--scrollbarsliderbuttondown-src)] bg-position-[-0px_-0px] bg-size-[170px_16px] bg-no-repeat [image-rendering:pixelated] active:[background-image:var(--scrollbarsliderbuttondown-src)] active:bg-position-[-17px_-0px] active:bg-size-[170px_16px] active:bg-no-repeat active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarsliderbuttondown-src)] aria-disabled:bg-position-[-34px_-0px] aria-disabled:bg-size-[170px_16px] aria-disabled:bg-no-repeat aria-disabled:[image-rendering:pixelated]',
        // black
        '1': 'inline-block min-w-4.25 min-h-4 aria-disabled:pointer-events-none [background-image:var(--scrollbarsliderbuttondown-src)] bg-position-[-51px_-0px] bg-size-[170px_16px] bg-no-repeat [image-rendering:pixelated] active:[background-image:var(--scrollbarsliderbuttondown-src)] active:bg-position-[-68px_-0px] active:bg-size-[170px_16px] active:bg-no-repeat active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarsliderbuttondown-src)] aria-disabled:bg-position-[-85px_-0px] aria-disabled:bg-size-[170px_16px] aria-disabled:bg-no-repeat aria-disabled:[image-rendering:pixelated]',
        // default
        '3': 'inline-block min-w-4.25 min-h-4 aria-disabled:pointer-events-none [background-image:var(--scrollbarsliderbuttondown-src)] bg-position-[-102px_-0px] bg-size-[170px_16px] bg-no-repeat [image-rendering:pixelated] hover:[background-image:var(--scrollbarsliderbuttondown-src)] hover:bg-position-[-119px_-0px] hover:bg-size-[170px_16px] hover:bg-no-repeat hover:[image-rendering:pixelated] active:[background-image:var(--scrollbarsliderbuttondown-src)] active:bg-position-[-136px_-0px] active:bg-size-[170px_16px] active:bg-no-repeat active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarsliderbuttondown-src)] aria-disabled:bg-position-[-153px_-0px] aria-disabled:bg-size-[170px_16px] aria-disabled:bg-no-repeat aria-disabled:[image-rendering:pixelated]',
    },
} as const;

const scrollbarSliderButtonDownVariants = cva(
    '',
    {
        variants: scrollbarSliderButtonDownVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type ScrollbarSliderButtonDownVariantProps = VariantProps<typeof scrollbarSliderButtonDownVariantsConfig>;

interface ScrollbarSliderButtonDownProps extends HTMLAttributes<HTMLDivElement>, ScrollbarSliderButtonDownVariantProps {
    className?: string;
    defaultVariant?: string;
}

export const ScrollbarSliderButtonDown = forwardRef<HTMLDivElement, ScrollbarSliderButtonDownProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('scrollbarSliderButtonDown');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['scrollbarSliderButtonDown']?.[resolvedVariant as string];
        return (
            <div
                ref={ref}
                className={cn(scrollbarSliderButtonDownVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

ScrollbarSliderButtonDown.displayName = 'ScrollbarSliderButtonDown';
