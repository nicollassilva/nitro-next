import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const scrollbarSliderButtonRightVariantsConfig = {
    variant: {
        // default
        '0': 'inline-block min-w-[16px] min-h-[17px] aria-disabled:pointer-events-none [background-image:var(--scrollbarsliderbuttonright-0-default-src)] [background-size:100%_100%] [background-repeat:no-repeat] [image-rendering:pixelated] active:[background-image:var(--scrollbarsliderbuttonright-0-pressed-src)] active:[background-size:100%_100%] active:[background-repeat:no-repeat] active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarsliderbuttonright-0-disabled-src)] aria-disabled:[background-size:100%_100%] aria-disabled:[background-repeat:no-repeat] aria-disabled:[image-rendering:pixelated]',
        // black
        '1': 'inline-block min-w-[16px] min-h-[17px] aria-disabled:pointer-events-none [background-image:var(--scrollbarsliderbuttonright-1-default-src)] [background-size:100%_100%] [background-repeat:no-repeat] [image-rendering:pixelated] active:[background-image:var(--scrollbarsliderbuttonright-1-pressed-src)] active:[background-size:100%_100%] active:[background-repeat:no-repeat] active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarsliderbuttonright-1-disabled-src)] aria-disabled:[background-size:100%_100%] aria-disabled:[background-repeat:no-repeat] aria-disabled:[image-rendering:pixelated]',
        // default
        '3': 'inline-block min-w-[16px] min-h-[17px] aria-disabled:pointer-events-none [background-image:var(--scrollbarsliderbuttonright-3-default-src)] [background-size:100%_100%] [background-repeat:no-repeat] [image-rendering:pixelated] hover:[background-image:var(--scrollbarsliderbuttonright-3-hovering-src)] hover:[background-size:100%_100%] hover:[background-repeat:no-repeat] hover:[image-rendering:pixelated] active:[background-image:var(--scrollbarsliderbuttonright-3-pressed-src)] active:[background-size:100%_100%] active:[background-repeat:no-repeat] active:[image-rendering:pixelated] aria-disabled:[background-image:var(--scrollbarsliderbuttonright-3-disabled-src)] aria-disabled:[background-size:100%_100%] aria-disabled:[background-repeat:no-repeat] aria-disabled:[image-rendering:pixelated]',
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
}

export const ScrollbarSliderButtonRight = forwardRef<HTMLDivElement, ScrollbarSliderButtonRightProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(scrollbarSliderButtonRightVariants({ variant }), className)}
            {...props}
        />
    )
);

ScrollbarSliderButtonRight.displayName = 'ScrollbarSliderButtonRight';
