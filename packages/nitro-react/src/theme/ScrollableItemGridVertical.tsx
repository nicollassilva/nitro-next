import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

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
    defaultVariant?: string;
}

export const ScrollableItemGridVertical = forwardRef<HTMLDivElement, ScrollableItemGridVerticalProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('scrollableItemGridVertical');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['scrollableItemGridVertical']?.[resolvedVariant as string];
        return (
            <div
                ref={ref}
                className={cn(scrollableItemGridVerticalVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

ScrollableItemGridVertical.displayName = 'ScrollableItemGridVertical';
