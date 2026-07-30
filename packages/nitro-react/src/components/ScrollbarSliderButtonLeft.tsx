import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const scrollbarSliderButtonLeftVariantsConfig = {
    variant: {
        // default
        '0': 'inline-block min-w-[16px] min-h-[17px] aria-disabled:pointer-events-none [background-image:var(--scrollbarsliderbuttonleft-0-default-src)] [background-size:100%_100%] [background-repeat:no-repeat] [image-rendering:pixelated] active:[background-image:var(--scrollbarsliderbuttonleft-0-pressed-src)] active:[background-size:100%_100%] active:[background-repeat:no-repeat] active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarsliderbuttonleft-0-disabled-src)] aria-disabled:[background-size:100%_100%] aria-disabled:[background-repeat:no-repeat] aria-disabled:[image-rendering:pixelated]',
        // black
        '1': 'inline-block min-w-[16px] min-h-[17px] aria-disabled:pointer-events-none [background-image:var(--scrollbarsliderbuttonleft-1-default-src)] [background-size:100%_100%] [background-repeat:no-repeat] [image-rendering:pixelated] active:[background-image:var(--scrollbarsliderbuttonleft-1-pressed-src)] active:[background-size:100%_100%] active:[background-repeat:no-repeat] active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarsliderbuttonleft-1-disabled-src)] aria-disabled:[background-size:100%_100%] aria-disabled:[background-repeat:no-repeat] aria-disabled:[image-rendering:pixelated]',
        // default
        '3': 'inline-block min-w-[17px] min-h-[17px] aria-disabled:pointer-events-none [background-image:var(--scrollbarsliderbuttonleft-3-default-src)] [background-size:100%_100%] [background-repeat:no-repeat] [image-rendering:pixelated] hover:[background-image:var(--scrollbarsliderbuttonleft-3-hovering-src)] hover:[background-size:100%_100%] hover:[background-repeat:no-repeat] hover:[image-rendering:pixelated] active:[background-image:var(--scrollbarsliderbuttonleft-3-pressed-src)] active:[background-size:100%_100%] active:[background-repeat:no-repeat] active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarsliderbuttonleft-3-disabled-src)] aria-disabled:[background-size:100%_100%] aria-disabled:[background-repeat:no-repeat] aria-disabled:[image-rendering:pixelated]',
    },
} as const;

const scrollbarSliderButtonLeftVariants = cva(
    '',
    {
        variants: scrollbarSliderButtonLeftVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type ScrollbarSliderButtonLeftVariantProps = VariantProps<typeof scrollbarSliderButtonLeftVariantsConfig>;

interface ScrollbarSliderButtonLeftProps extends HTMLAttributes<HTMLDivElement>, ScrollbarSliderButtonLeftVariantProps {
    className?: string;
}

export const ScrollbarSliderButtonLeft = forwardRef<HTMLDivElement, ScrollbarSliderButtonLeftProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(scrollbarSliderButtonLeftVariants({ variant }), className)}
            {...props}
        />
    )
);

ScrollbarSliderButtonLeft.displayName = 'ScrollbarSliderButtonLeft';
