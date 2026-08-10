import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, useTintedVars, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const droplistVariantsConfig = {
    variant: {
        // default
        '0': '[border-image-source:var(--dropmenu-0-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] nine-slice-border min-w-10 min-h-5.5 text-[#000000] text-style-regular',
        // white
        '1': '[border-image-source:var(--droplist-1-default-src)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px_6px_6px_6px] nine-slice-border min-w-10 min-h-5.5 text-[#000000] text-style-regular',
    },
} as const;

const droplistOverlayVariantsConfig = {
    variant: {
        // default
        '0': 'bg-(image:--dropmenu-0-default-arrow-src) bg-position-[right_5px_top_2px] bg-size-[16px_16px] bg-no-repeat pixel-art',
        // white
        '1': 'bg-(image:--droplist-1-default-arrow-src) bg-position-[right_4px_top_10px] bg-size-[16px_16px] bg-no-repeat pixel-art',
    },
} as const;

const droplistTintColors: Partial<Record<string, string>> = {

};

const droplistTintableVars: Partial<Record<string, string[]>> = {
    '0': ['dropmenu-0-default-src'],
    '1': ['droplist-1-default-src'],
};

const droplistVariants = cva('', { variants: droplistVariantsConfig, defaultVariants: { variant: '0' } });
const droplistOverlayVariants = cva('', { variants: droplistOverlayVariantsConfig, defaultVariants: { variant: '0' } });

type DroplistVariantProps = VariantProps<typeof droplistVariantsConfig>;

interface DroplistProps extends HTMLAttributes<HTMLDivElement>, DroplistVariantProps {
    className?: string;
    tintColor?: string;
    defaultVariant?: string;
}

export const Droplist = forwardRef<HTMLDivElement, DroplistProps>(
    ({ className, variant, defaultVariant, tintColor, style, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('droplist');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['droplist']?.[resolvedVariant];
        const resolvedTint = tintColor || droplistTintColors[resolvedVariant as string];
        const overlayClassName = droplistOverlayVariants({ variant: resolvedVariant });
        const tintStyle = useTintedVars(droplistTintableVars[resolvedVariant as string], resolvedTint);

        return (
            <div
                ref={ref}
                className={cn(droplistVariants({ variant: resolvedVariant }), overlayClassName && 'relative', className)}
                style={{ ...style, ...tintStyle }}
                {...props}
            >
                {overlayClassName && <div aria-hidden className={cn('pointer-events-none absolute inset-0', overlayClassName)} />}
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

Droplist.displayName = 'Droplist';
