import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const scrollbarSliderButtonUpVariantsConfig = {
    variant: {
        // default
        '0': 'inline-block min-w-4.25 min-h-4 aria-disabled:pointer-events-none [background-image:var(--scrollbarsliderbuttonup-src)] bg-position-[-0px_-0px] bg-size-[170px_16px] bg-no-repeat [image-rendering:pixelated] active:[background-image:var(--scrollbarsliderbuttonup-src)] active:bg-position-[-17px_-0px] active:bg-size-[170px_16px] active:bg-no-repeat active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarsliderbuttonup-src)] aria-disabled:bg-position-[-34px_-0px] aria-disabled:bg-size-[170px_16px] aria-disabled:bg-no-repeat aria-disabled:[image-rendering:pixelated]',
        // black
        '1': 'inline-block min-w-4.25 min-h-4 aria-disabled:pointer-events-none [background-image:var(--scrollbarsliderbuttonup-src)] bg-position-[-51px_-0px] bg-size-[170px_16px] bg-no-repeat [image-rendering:pixelated] active:[background-image:var(--scrollbarsliderbuttonup-src)] active:bg-position-[-68px_-0px] active:bg-size-[170px_16px] active:bg-no-repeat active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarsliderbuttonup-src)] aria-disabled:bg-position-[-85px_-0px] aria-disabled:bg-size-[170px_16px] aria-disabled:bg-no-repeat aria-disabled:[image-rendering:pixelated]',
        // default
        '3': 'inline-block min-w-4.25 min-h-4 aria-disabled:pointer-events-none [background-image:var(--scrollbarsliderbuttonup-src)] bg-position-[-102px_-0px] bg-size-[170px_16px] bg-no-repeat [image-rendering:pixelated] hover:[background-image:var(--scrollbarsliderbuttonup-src)] hover:bg-position-[-119px_-0px] hover:bg-size-[170px_16px] hover:bg-no-repeat hover:[image-rendering:pixelated] active:[background-image:var(--scrollbarsliderbuttonup-src)] active:bg-position-[-136px_-0px] active:bg-size-[170px_16px] active:bg-no-repeat active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarsliderbuttonup-src)] aria-disabled:bg-position-[-153px_-0px] aria-disabled:bg-size-[170px_16px] aria-disabled:bg-no-repeat aria-disabled:[image-rendering:pixelated]',
    },
} as const;

const scrollbarSliderButtonUpVariants = cva(
    '',
    {
        variants: scrollbarSliderButtonUpVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type ScrollbarSliderButtonUpVariantProps = VariantProps<typeof scrollbarSliderButtonUpVariantsConfig>;

interface ScrollbarSliderButtonUpProps extends HTMLAttributes<HTMLDivElement>, ScrollbarSliderButtonUpVariantProps {
    className?: string;
}

export const ScrollbarSliderButtonUp = forwardRef<HTMLDivElement, ScrollbarSliderButtonUpProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(scrollbarSliderButtonUpVariants({ variant }), className)}
            {...props}
        />
    )
);

ScrollbarSliderButtonUp.displayName = 'ScrollbarSliderButtonUp';
