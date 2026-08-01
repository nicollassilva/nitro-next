import { forwardRef, type HTMLAttributes } from 'react';

import { useTintedVars } from '#base/utils';
import { cn, cva, type VariantProps } from '#base/utils';

const scalerVariantsConfig = {
    variant: {
        // default
        '0': 'inline-block min-w-3.75 min-h-3.75 [background-image:var(--scaler-0-default-src)] bg-size-auto bg-no-repeat',
        // black
        '1': 'inline-block min-w-3.75 min-h-3.75 [background-image:var(--scaler-0-default-src)] bg-size-auto bg-no-repeat',
        // white
        '2': 'inline-block min-w-3.75 min-h-3.75 [background-image:var(--scaler-0-default-src)] bg-size-auto bg-no-repeat',
        // default
        '3': 'inline-block min-w-5 min-h-5 [background-image:var(--scaler-3-default-src)] bg-size-[100%_100%] bg-no-repeat',
        // light
        '4': 'inline-block min-w-5 min-h-5 [background-image:var(--scaler-3-default-src)] bg-size-auto bg-no-repeat',
        // default
        '100': '',
    },
} as const;

const scalerOverlayVariantsConfig = {
    variant: {
        // default
        '0': '[background-image:var(--scaler-0-default-shine-src)] bg-size-[100%_100%] bg-no-repeat',
        // black
        '1': '[background-image:var(--scaler-0-default-shine-src)] bg-size-[100%_100%] bg-no-repeat',
        // white
        '2': '[background-image:var(--scaler-0-default-shine-src)] bg-size-[100%_100%] bg-no-repeat',
        // default
        '3': '',
        // light
        '4': '',
        // default
        '100': '',
    },
} as const;

/** This component's own default tint per variant, from the skin's own `<window color="…">` — a caller-supplied `tintColor` prop always overrides this. */
const scalerTintColors: Partial<Record<string, string>> = {

};

/** Which CSS vars (bare, no `--`) each variant's own art actually needs recolored — see `#base/useTintedVars`. */
const scalerTintableVars: Partial<Record<string, string[]>> = {
    '0': ['scaler-0-default-src'],
    '1': ['scaler-0-default-src'],
    '2': ['scaler-0-default-src'],
    '3': ['scaler-3-default-src'],
    '4': ['scaler-3-default-src'],
};

const scalerVariants = cva('absolute bottom-1 right-1', { variants: scalerVariantsConfig, defaultVariants: { variant: '0' } });
const scalerOverlayVariants = cva('', { variants: scalerOverlayVariantsConfig, defaultVariants: { variant: '0' } });

type ScalerVariantProps = VariantProps<typeof scalerVariantsConfig>;

interface ScalerProps extends HTMLAttributes<HTMLDivElement>, ScalerVariantProps {
    className?: string;
    /** Recolors this variant's tintable art at runtime — overrides this variant's own default color from the skin, if it has one (see `#base/pixiTint`). */
    tintColor?: string;
}

export const Scaler = forwardRef<HTMLDivElement, ScalerProps>(
    ({ className, variant, tintColor, style, children, ...props }, ref) => {
        const resolvedVariant = variant ?? '0';
        const resolvedTint = tintColor || scalerTintColors[resolvedVariant];
        const overlayClassName = scalerOverlayVariants({ variant });
        const tintStyle = useTintedVars(scalerTintableVars[resolvedVariant], resolvedTint);

        return null;

        return (
            <div
                ref={ref}
                className={cn(scalerVariants({ variant }), overlayClassName && 'relative', className)}
                style={{ ...style, ...tintStyle }}
                {...props}
            >
                {overlayClassName && <div aria-hidden className={cn('pointer-events-none absolute inset-0', overlayClassName)} />}
                {children}
            </div>
        );
    }
);

Scaler.displayName = 'Scaler';
