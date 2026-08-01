import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';

const scrollableItemListVerticalVariantsConfig = {
    variant: {
        // default
        '0': 'min-w-10 min-h-10 text-[#000000]',
        // default
        '3': 'min-w-10 min-h-10 text-[#000000]',
        // default
        '100': 'min-w-10 min-h-10 text-[#000000]',
    },
} as const;

const scrollableItemListVerticalVariants = cva(
    '',
    {
        variants: scrollableItemListVerticalVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type ScrollableItemListVerticalVariantProps = VariantProps<typeof scrollableItemListVerticalVariantsConfig>;

interface ScrollableItemListVerticalProps extends HTMLAttributes<HTMLDivElement>, ScrollableItemListVerticalVariantProps {
    className?: string;
}

export const ScrollableItemListVertical = forwardRef<HTMLDivElement, ScrollableItemListVerticalProps>(
    ({ className, variant, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(scrollableItemListVerticalVariants({ variant }), className)}
            {...props}
        />
    )
);

ScrollableItemListVertical.displayName = 'ScrollableItemListVertical';
