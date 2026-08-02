import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const buttonGroupLeftVariantsConfig = {
    variant: {
        // default
        '0': '[border-image-source:var(--buttongroupleft-0-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] nine-slice-border hover:[border-image-source:var(--buttongroupleft-0-hovering-src)] hover:[border-image-slice:3_3_3_3_fill] hover:[border-image-width:3px_3px_3px_3px] aria-selected:[border-image-source:var(--buttongroupleft-0-selected-src)] aria-selected:[border-image-slice:3_3_3_3_fill] aria-selected:[border-image-width:3px_3px_3px_3px] active:[border-image-source:var(--buttongroupleft-0-selected-src)] active:[border-image-slice:3_3_3_3_fill] active:[border-image-width:3px_3px_3px_3px]  aria-disabled:[border-image-source:var(--buttongroupleft-0-disabled-src)] aria-disabled:[border-image-slice:3_3_3_3_fill] aria-disabled:[border-image-width:3px_3px_3px_3px] aria-disabled:[border-image-repeat:stretch] aria-disabled:[image-rendering:pixelated] min-w-5 min-h-5.5 pl-2 pt-1 pr-2 pb-1 text-[#000000] text-style-button-regular',
        // black
        '1': '[border-image-source:var(--buttongroupleft-1-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] nine-slice-border hover:[border-image-source:var(--buttongroupleft-1-hovering-src)] hover:[border-image-slice:3_3_3_3_fill] hover:[border-image-width:3px_3px_3px_3px] aria-selected:[border-image-source:var(--buttongroupleft-1-selected-src)] aria-selected:[border-image-slice:3_3_3_3_fill] aria-selected:[border-image-width:3px_3px_3px_3px] active:[border-image-source:var(--buttongroupleft-1-selected-src)] active:[border-image-slice:3_3_3_3_fill] active:[border-image-width:3px_3px_3px_3px]  aria-disabled:[border-image-source:var(--buttongroupleft-1-disabled-src)] aria-disabled:[border-image-slice:3_3_3_3_fill] aria-disabled:[border-image-width:3px_3px_3px_3px] aria-disabled:[border-image-repeat:stretch] aria-disabled:[image-rendering:pixelated] min-w-5 min-h-5.5 pl-2 pt-1 pr-2 pb-1 text-[#ffffff] text-style-button-regular',
        // white
        '2': '[border-image-source:var(--buttongroupleft-0-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] nine-slice-border hover:[border-image-source:var(--buttongroupleft-0-hovering-src)] hover:[border-image-slice:3_3_3_3_fill] hover:[border-image-width:3px_3px_3px_3px] aria-selected:[border-image-source:var(--buttongroupleft-0-selected-src)] aria-selected:[border-image-slice:3_3_3_3_fill] aria-selected:[border-image-width:3px_3px_3px_3px] active:[border-image-source:var(--buttongroupleft-0-selected-src)] active:[border-image-slice:3_3_3_3_fill] active:[border-image-width:3px_3px_3px_3px]  aria-disabled:[border-image-source:var(--buttongroupleft-0-disabled-src)] aria-disabled:[border-image-slice:3_3_3_3_fill] aria-disabled:[border-image-width:3px_3px_3px_3px] aria-disabled:[border-image-repeat:stretch] aria-disabled:[image-rendering:pixelated] min-w-5 min-h-5.5 pl-2 pt-1 pr-2 pb-1 text-[#000000] text-style-button-regular',
        // default
        '100': '[border-image-source:var(--buttongroupleft-0-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] nine-slice-border hover:[border-image-source:var(--buttongroupleft-0-hovering-src)] hover:[border-image-slice:3_3_3_3_fill] hover:[border-image-width:3px_3px_3px_3px] aria-selected:[border-image-source:var(--buttongroupleft-0-selected-src)] aria-selected:[border-image-slice:3_3_3_3_fill] aria-selected:[border-image-width:3px_3px_3px_3px] active:[border-image-source:var(--buttongroupleft-0-selected-src)] active:[border-image-slice:3_3_3_3_fill] active:[border-image-width:3px_3px_3px_3px]  aria-disabled:[border-image-source:var(--buttongroupleft-0-disabled-src)] aria-disabled:[border-image-slice:3_3_3_3_fill] aria-disabled:[border-image-width:3px_3px_3px_3px] aria-disabled:[border-image-repeat:stretch] aria-disabled:[image-rendering:pixelated] min-w-7 min-h-7 pl-3.25 pt-0.75 pr-3.25 pb-0.75 text-[#000000] text-style-il-button',
    },
} as const;

const buttonGroupLeftVariants = cva(
    '',
    {
        variants: buttonGroupLeftVariantsConfig,
        defaultVariants: {
            variant: '0',
        },
    }
);

type ButtonGroupLeftVariantProps = VariantProps<typeof buttonGroupLeftVariantsConfig>;

interface ButtonGroupLeftProps extends HTMLAttributes<HTMLDivElement>, ButtonGroupLeftVariantProps {
    className?: string;
    defaultVariant?: string;
}

export const ButtonGroupLeft = forwardRef<HTMLDivElement, ButtonGroupLeftProps>(
    ({ className, variant, defaultVariant, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('buttonGroupLeft');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['buttonGroupLeft']?.[resolvedVariant];
        return (
            <div
                ref={ref}
                className={cn(buttonGroupLeftVariants({ variant: resolvedVariant }), className)}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

ButtonGroupLeft.displayName = 'ButtonGroupLeft';
