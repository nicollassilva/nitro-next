import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const scrollbarSliderButtonDownVariantsConfig = {
    variant: {
        // default
        '0': 'inline-block min-w-[17px] min-h-[16px] aria-disabled:pointer-events-none [background-image:var(--scrollbarsliderbuttondown-0-default-src)] [background-size:100%_100%] [background-repeat:no-repeat] [image-rendering:pixelated] active:[background-image:var(--scrollbarsliderbuttondown-0-pressed-src)] active:[background-size:100%_100%] active:[background-repeat:no-repeat] active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarsliderbuttondown-0-disabled-src)] aria-disabled:[background-size:100%_100%] aria-disabled:[background-repeat:no-repeat] aria-disabled:[image-rendering:pixelated]',
        // black
        '1': 'inline-block min-w-[17px] min-h-[16px] aria-disabled:pointer-events-none [background-image:var(--scrollbarsliderbuttondown-1-default-src)] [background-size:100%_100%] [background-repeat:no-repeat] [image-rendering:pixelated] active:[background-image:var(--scrollbarsliderbuttondown-1-pressed-src)] active:[background-size:100%_100%] active:[background-repeat:no-repeat] active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarsliderbuttondown-1-disabled-src)] aria-disabled:[background-size:100%_100%] aria-disabled:[background-repeat:no-repeat] aria-disabled:[image-rendering:pixelated]',
        // default
        '3': 'inline-block min-w-[17px] min-h-[16px] aria-disabled:pointer-events-none [background-image:var(--scrollbarsliderbuttondown-3-default-src)] [background-size:100%_100%] [background-repeat:no-repeat] [image-rendering:pixelated] hover:[background-image:var(--scrollbarsliderbuttondown-3-hovering-src)] hover:[background-size:100%_100%] hover:[background-repeat:no-repeat] hover:[image-rendering:pixelated] active:[background-image:var(--scrollbarsliderbuttondown-3-pressed-src)] active:[background-size:100%_100%] active:[background-repeat:no-repeat] active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarsliderbuttondown-3-disabled-src)] aria-disabled:[background-size:100%_100%] aria-disabled:[background-repeat:no-repeat] aria-disabled:[image-rendering:pixelated]',
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
}

export const ScrollbarSliderButtonDown = forwardRef<HTMLDivElement, ScrollbarSliderButtonDownProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(scrollbarSliderButtonDownVariants({ variant }), className)}
            {...props}
        />
    )
);

ScrollbarSliderButtonDown.displayName = 'ScrollbarSliderButtonDown';
