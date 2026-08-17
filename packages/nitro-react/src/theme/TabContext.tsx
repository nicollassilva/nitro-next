import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const tabContextVariantsConfig = {
    variant: {
        // default
        '0': 'min-h-5.5 max-h-5.5 text-[#000000]',
        // default
        '3': ' text-[#000000]',
    },
} as const;

const tabContextVariants = cva(
    'w-full flex gap-0 px-1.25 pt-1 z-20',
    {
        variants: tabContextVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type TabContextVariantProps = VariantProps<typeof tabContextVariantsConfig>;

interface TabContextProps extends HTMLAttributes<HTMLDivElement>, TabContextVariantProps {
    className?: string;
    defaultVariant?: string;
}

export const TabContext = forwardRef<HTMLDivElement, TabContextProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('tabContext');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['tabContext']?.[resolvedVariant as string];
        return (
            <div
                ref={ref}
                className={cn(tabContextVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

TabContext.displayName = 'TabContext';
