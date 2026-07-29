import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const scalerVariantsConfig = {
    variant: {
        // default
        '0': 'inline-block min-w-3.75 min-h-3.75 [background-image:var(--scaler-0-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated]',
        // black
        '1': 'inline-block min-w-3.75 min-h-3.75 [background-image:var(--scaler-0-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated]',
        // white
        '2': 'inline-block min-w-3.75 min-h-3.75 [background-image:var(--scaler-0-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated]',
        // default
        '3': 'inline-block min-w-5 min-h-5 [background-image:var(--scaler-3-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated]',
        // light
        '4': 'inline-block min-w-5 min-h-5 [background-image:var(--scaler-3-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated]',
        // default
        '100': '',
    },
} as const;

const scalerVariants = cva(
    'absolute bottom-1 right-1',
    {
        variants: scalerVariantsConfig,
        defaultVariants: {
            variant: '3',
        },
    }
);

type ScalerVariantProps = VariantProps<typeof scalerVariantsConfig>;

interface ScalerProps extends HTMLAttributes<HTMLDivElement>, ScalerVariantProps {
    className?: string;
}

export const Scaler = forwardRef<HTMLDivElement, ScalerProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(scalerVariants({ variant }), className)}
            {...props}
        />
    )
);

Scaler.displayName = 'Scaler';
