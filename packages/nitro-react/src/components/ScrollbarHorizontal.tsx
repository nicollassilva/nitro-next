import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const scrollbarHorizontalVariantsConfig = {
    variant: {
        // default — graphics asset has no usable "default" state
        '0': 'min-w-14 min-h-4.25 text-[#000000]',
        // black — graphics asset has no usable "default" state
        '1': 'min-w-14 min-h-4.25 text-[#000000]',
        // default — graphics asset has no usable "default" state
        '3': 'min-w-14 min-h-4.25 text-[#000000]',
        // default — graphics asset has no usable "default" state
        '100': 'min-w-2.25 min-h-2.25 text-[#000000]',
        // default — graphics asset has no usable "default" state
        '200': 'min-w-2.25 min-h-2.25 text-[#000000]',
    },
} as const;

const scrollbarHorizontalVariants = cva(
    '',
    {
        variants: scrollbarHorizontalVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type ScrollbarHorizontalVariantProps = VariantProps<typeof scrollbarHorizontalVariantsConfig>;

interface ScrollbarHorizontalProps extends HTMLAttributes<HTMLDivElement>, ScrollbarHorizontalVariantProps {
    className?: string;
}

export const ScrollbarHorizontal = forwardRef<HTMLDivElement, ScrollbarHorizontalProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(scrollbarHorizontalVariants({ variant }), className)}
            {...props}
        />
    )
);

ScrollbarHorizontal.displayName = 'ScrollbarHorizontal';
