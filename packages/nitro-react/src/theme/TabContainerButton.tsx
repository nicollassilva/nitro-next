import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const tabContainerButtonVariantsConfig = {
    variant: {
        // default
        '0': '[border-image-source:var(--tabbutton-0-default-src)] [border-image-slice:5_5_2_5_fill] [border-image-width:5px_5px_0px_5px] nine-slice-border hover:[border-image-source:var(--tabbutton-0-hovering-src)] hover:[border-image-slice:5_5_2_5_fill] hover:[border-image-width:5px_5px_0px_5px] aria-selected:[border-image-source:var(--tabbutton-0-selected-src)] aria-selected:[border-image-slice:5_5_2_5_fill] aria-selected:[border-image-width:5px_5px_0px_5px] active:[border-image-source:var(--tabbutton-0-selected-src)] active:[border-image-slice:5_5_2_5_fill] active:[border-image-width:5px_5px_0px_5px] ',
        // black
        '1': '[border-image-source:var(--tabbutton-1-default-src)] [border-image-slice:5_5_2_5_fill] [border-image-width:5px_5px_0px_5px] nine-slice-border hover:[border-image-source:var(--tabbutton-1-hovering-src)] hover:[border-image-slice:5_5_2_5_fill] hover:[border-image-width:5px_5px_0px_5px] aria-selected:[border-image-source:var(--tabbutton-1-selected-src)] aria-selected:[border-image-slice:5_5_2_5_fill] aria-selected:[border-image-width:5px_5px_0px_5px] active:[border-image-source:var(--tabbutton-1-selected-src)] active:[border-image-slice:5_5_2_5_fill] active:[border-image-width:5px_5px_0px_5px] ',
        // white
        '2': '[border-image-source:var(--tabbutton-0-default-src)] [border-image-slice:5_5_2_5_fill] [border-image-width:5px_5px_0px_5px] nine-slice-border hover:[border-image-source:var(--tabbutton-0-hovering-src)] hover:[border-image-slice:5_5_2_5_fill] hover:[border-image-width:5px_5px_0px_5px] aria-selected:[border-image-source:var(--tabbutton-0-selected-src)] aria-selected:[border-image-slice:5_5_2_5_fill] aria-selected:[border-image-width:5px_5px_0px_5px] active:[border-image-source:var(--tabbutton-0-selected-src)] active:[border-image-slice:5_5_2_5_fill] active:[border-image-width:5px_5px_0px_5px] ',
        // default
        '3': '[border-image-source:var(--tabbutton-3-default-src)] [border-image-slice:0_9_0_9_fill] [border-image-width:0px_9px_0px_9px] nine-slice-border hover:[border-image-source:var(--tabbutton-3-hovering-src)] hover:[border-image-slice:0_9_0_9_fill] hover:[border-image-width:0px_9px_0px_9px] aria-selected:[border-image-source:var(--tabbutton-3-selected-src)] aria-selected:[border-image-slice:0_9_0_9_fill] aria-selected:[border-image-width:0px_9px_0px_9px] active:[border-image-source:var(--tabbutton-3-selected-src)] active:[border-image-slice:0_9_0_9_fill] active:[border-image-width:0px_9px_0px_9px] ',
    },
} as const;

const tabContainerButtonVariants = cva(
    '',
    {
        variants: tabContainerButtonVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type TabContainerButtonVariantProps = VariantProps<typeof tabContainerButtonVariantsConfig>;

interface TabContainerButtonProps extends HTMLAttributes<HTMLDivElement>, TabContainerButtonVariantProps {
    className?: string;
    defaultVariant?: string;
}

export const TabContainerButton = forwardRef<HTMLDivElement, TabContainerButtonProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('tabContainerButton');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['tabContainerButton']?.[resolvedVariant];
        return (
            <div
                ref={ref}
                className={cn(tabContainerButtonVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

TabContainerButton.displayName = 'TabContainerButton';
