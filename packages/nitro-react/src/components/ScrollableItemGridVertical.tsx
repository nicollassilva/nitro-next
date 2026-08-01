import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const scrollableItemGridVerticalVariantsConfig = {
    variant: {
        // default
        '0': 'min-w-10 min-h-10 text-[#000000]',
        // default
        '3': 'min-w-10 min-h-10 text-[#000000]',
    },
} as const;

const scrollableItemGridVerticalVariants = cva(
    '',
    {
        variants: scrollableItemGridVerticalVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type ScrollableItemGridVerticalVariantProps = VariantProps<typeof scrollableItemGridVerticalVariantsConfig>;

interface ScrollableItemGridVerticalProps extends HTMLAttributes<HTMLDivElement>, ScrollableItemGridVerticalVariantProps {
    className?: string;
}

export const ScrollableItemGridVertical = forwardRef<HTMLDivElement, ScrollableItemGridVerticalProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(scrollableItemGridVerticalVariants({ variant }), className)}
            {...props}
        />
    )
);

ScrollableItemGridVertical.displayName = 'ScrollableItemGridVertical';
