import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

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
    defaultVariant?: string;
}

export const ScrollableItemListVertical = forwardRef<HTMLDivElement, ScrollableItemListVerticalProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('scrollableItemListVertical');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['scrollableItemListVertical']?.[resolvedVariant as string];
        return (
            <div
                ref={ref}
                className={cn(scrollableItemListVerticalVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

ScrollableItemListVertical.displayName = 'ScrollableItemListVertical';
