import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const tabContentVariantsConfig = {
    variant: {
        // default
        '0': '[border-image-source:var(--border-0-default-src)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px_6px_6px_6px] nine-slice-border p-1.5',
        // black
        '1': '[border-image-source:var(--border-1-default-src)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px_6px_6px_6px] nine-slice-border p-1.5',
        // white
        '2': '[border-image-source:var(--border-2-default-src)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px_6px_6px_6px] nine-slice-border p-1.5',
        // default
        '3': '[border-image-source:var(--tabcontent-3-default-src)] [border-image-slice:15_0_2_0_fill] [border-image-width:15px_0px_0px_0px] nine-slice-border pt-1.5 px-1.25 -mt-0.5 pb-0.5',
    },
} as const;

const tabContentVariants = cva(
    'z-10 h-full overflow-hidden',
    {
        variants: tabContentVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type TabContentVariantProps = VariantProps<typeof tabContentVariantsConfig>;

interface TabContentProps extends HTMLAttributes<HTMLDivElement>, TabContentVariantProps {
    className?: string;
    defaultVariant?: string;
}

export const TabContent = forwardRef<HTMLDivElement, TabContentProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('tabContent');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['tabContent']?.[resolvedVariant as string];
        return (
            <div
                ref={ref}
                className={cn(tabContentVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

TabContent.displayName = 'TabContent';
