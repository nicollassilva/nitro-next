import { forwardRef, type HTMLAttributes } from 'react';

import { cn, DYNAMIC_ART_CLASS, DYNAMIC_ROOT_CLASS, type DynamicStyleName, useDynamicStyle, useTintedVars, type VariantProps } from '#base/utils';

import {
    borderArtVariants,
    borderBoxVariants,
    borderOverlayVariants,
    borderTintableVars,
    borderTintColors,
    type BorderVariantsConfig,
} from './borderVariants';

interface BorderProps extends HTMLAttributes<HTMLDivElement>, VariantProps<BorderVariantsConfig> {
    className?: string;
    /** Recolors this variant's tintable art at runtime — overrides this variant's own default color from the skin, if it has one (see `#base/pixiTint`). */
    tintColor?: string;
    /** The layout XML's `blend` — fades this variant's art only, leaving the content on top at full opacity. */
    blend?: number;
    dynamicStyle?: DynamicStyleName;
    disabled?: boolean;
}

export const Border = forwardRef<HTMLDivElement, BorderProps>(
    ({ className, variant, tintColor, blend, dynamicStyle, disabled, style, children, ...props }, ref) => {
        const resolvedVariant = variant ?? '0';
        const resolvedTint = tintColor || borderTintColors[resolvedVariant];
        const overlayClassName = borderOverlayVariants({ variant });
        const tintStyle = useTintedVars(borderTintableVars[resolvedVariant], resolvedTint);
        const dynamicVars = useDynamicStyle(dynamicStyle);
        const artStyle = blend === undefined ? undefined : { opacity: blend };

        return (
            <div
                ref={ref}
                data-disabled={disabled || undefined}
                className={cn('relative isolate', borderBoxVariants({ variant }), dynamicVars && DYNAMIC_ROOT_CLASS, className)}
                style={{ ...style, ...tintStyle, ...dynamicVars }}
                {...props}
            >
                <div
                    aria-hidden
                    style={artStyle}
                    className={cn(
                        'pointer-events-none absolute inset-0 -z-10',
                        borderArtVariants({ variant }),
                        dynamicVars && DYNAMIC_ART_CLASS
                    )}
                />
                {overlayClassName && (
                    <div
                        aria-hidden
                        style={artStyle}
                        className={cn('pointer-events-none absolute inset-0 -z-10', overlayClassName)}
                    />
                )}
                {children}
            </div>
        );
    }
);

Border.displayName = 'Border';
