import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const scrollbarVerticalVariantsConfig = {
    variant: {
        // default — graphics asset has no usable "default" state
        '0': 'min-w-4.25 min-h-14 text-[#000000]',
        // black — graphics asset has no usable "default" state
        '1': 'min-w-4.25 min-h-14 text-[#000000]',
        // default — graphics asset has no usable "default" state
        '3': 'min-w-4.25 min-h-14 text-[#000000]',
        // default — graphics asset has no usable "default" state
        '100': 'min-w-2.25 min-h-2.25 text-[#000000]',
        // default — graphics asset has no usable "default" state
        '200': 'min-w-2.25 min-h-2.25 text-[#000000]',
    },
} as const;

const scrollbarVerticalVariants = cva(
    '',
    {
        variants: scrollbarVerticalVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type ScrollbarVerticalVariantProps = VariantProps<typeof scrollbarVerticalVariantsConfig>;

interface ScrollbarVerticalProps extends HTMLAttributes<HTMLDivElement>, ScrollbarVerticalVariantProps {
    className?: string;
}

export const ScrollbarVertical = forwardRef<HTMLDivElement, ScrollbarVerticalProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(scrollbarVerticalVariants({ variant }), className)}
            {...props}
        />
    )
);

ScrollbarVertical.displayName = 'ScrollbarVertical';
