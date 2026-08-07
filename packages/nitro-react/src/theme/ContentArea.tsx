import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const contentAreaVariantsConfig = {
    variant: {
        // default
        '0': 'flex flex-col w-full px-0.75 pb-0.75',
        // default
        '3': 'relative flex flex-col w-full px-0.75',
    },
} as const;

const contentArea = cva(
    'flex size-full overflow-hidden z-20',
    {
        variants: contentAreaVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type ContentAreaVariantProps = VariantProps<typeof contentAreaVariantsConfig>;

interface ContentAreaProps extends HTMLAttributes<HTMLDivElement>, ContentAreaVariantProps {
    className?: string;
    defaultVariant?: string;
}

export const ContentArea = forwardRef<HTMLDivElement, ContentAreaProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('contentArea');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['contentArea']?.[resolvedVariant as string];
        return (
            <div
                ref={ref}
                className={cn(contentArea({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

ContentArea.displayName = 'ContentArea';
