import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, useTintedVars, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const scalerVariantsConfig = {
    variant: {
        // default
        '0': 'inline-block min-w-3.75 min-h-3.75 [background-image:var(--scaler-0-default-src)] bg-size-[15px_15px] bg-no-repeat [image-rendering:pixelated]',
        // black
        '1': 'inline-block min-w-3.75 min-h-3.75 [background-image:var(--scaler-0-default-src)] bg-size-[15px_15px] bg-no-repeat [image-rendering:pixelated]',
        // white
        '2': 'inline-block min-w-3.75 min-h-3.75 [background-image:var(--scaler-0-default-src)] bg-size-[15px_15px] bg-no-repeat [image-rendering:pixelated]',
        // default
        '3': 'inline-block min-w-5 min-h-5 [background-image:var(--scaler-src)] bg-position-[-0px_-0px] bg-size-[20px_20px] bg-no-repeat [image-rendering:pixelated]',
        // light
        '4': 'inline-block min-w-5 min-h-5 [background-image:var(--scaler-src)] bg-position-[-0px_-0px] bg-size-[20px_20px] bg-no-repeat [image-rendering:pixelated]',
        // default
        '100': '',
    },
} as const;

const scalerOverlayVariantsConfig = {
    variant: {
        // default
        '0': '[background-image:var(--scaler-0-default-shine-src)] bg-size-[15px_15px] bg-no-repeat [image-rendering:pixelated]',
        // black
        '1': '[background-image:var(--scaler-0-default-shine-src)] bg-size-[15px_15px] bg-no-repeat [image-rendering:pixelated]',
        // white
        '2': '[background-image:var(--scaler-0-default-shine-src)] bg-size-[15px_15px] bg-no-repeat [image-rendering:pixelated]',
        // default
        '3': '',
        // light
        '4': '',
        // default
        '100': '',
    },
} as const;

const scalerTintColors: Partial<Record<string, string>> = {

};

const scalerTintableVars: Partial<Record<string, string[]>> = {
    '0': ['scaler-0-default-src'],
    '1': ['scaler-0-default-src'],
    '2': ['scaler-0-default-src'],
};

const scalerVariants = cva('', { variants: scalerVariantsConfig, defaultVariants: { variant: '0' } });
const scalerOverlayVariants = cva('', { variants: scalerOverlayVariantsConfig, defaultVariants: { variant: '0' } });

type ScalerVariantProps = VariantProps<typeof scalerVariantsConfig>;

interface ScalerProps extends HTMLAttributes<HTMLDivElement>, ScalerVariantProps {
    className?: string;
    tintColor?: string;
    defaultVariant?: string;
}

export const Scaler = forwardRef<HTMLDivElement, ScalerProps>(
    ({ className, variant, defaultVariant, tintColor, style, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('scaler');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['scaler']?.[resolvedVariant as string];
        const resolvedTint = tintColor || scalerTintColors[resolvedVariant as string];
        const overlayClassName = scalerOverlayVariants({ variant: resolvedVariant });
        const tintStyle = useTintedVars(scalerTintableVars[resolvedVariant as string], resolvedTint);

        return (
            <div
                ref={ref}
                className={cn(scalerVariants({ variant: resolvedVariant }), overlayClassName && 'relative', className)}
                style={{ ...style, ...tintStyle }}
                {...props}
            >
                {overlayClassName && <div aria-hidden className={cn('pointer-events-none absolute inset-0', overlayClassName)} />}
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

Scaler.displayName = 'Scaler';
