import { ButtonHTMLAttributes, forwardRef } from 'react';

import { cn, cva, useCascadedVariant, useTintedVars, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const buttonThickVariantsConfig = {
    variant: {
        // default
        '0': 'inline-block min-w-2 min-h-5.75 aria-disabled:pointer-events-none [background-image:var(--buttonthick-0-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] hover:[background-image:var(--buttonthick-0-hovering-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] active:[background-image:var(--buttonthick-0-pressed-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated] aria-disabled:[background-image:var(--buttonthick-0-disabled-src)] aria-disabled:bg-size-[100%_100%] aria-disabled:bg-no-repeat aria-disabled:[image-rendering:pixelated] pl-2 pt-1 pr-2 pb-1 text-[#000000] text-style-button-bold',
        // black
        '1': 'inline-block min-w-2 min-h-5.75 aria-disabled:pointer-events-none [background-image:var(--buttonthick-1-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] hover:[background-image:var(--buttonthick-1-hovering-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] active:[background-image:var(--buttonthick-1-pressed-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated] aria-disabled:[background-image:var(--buttonthick-1-disabled-src)] aria-disabled:bg-size-[100%_100%] aria-disabled:bg-no-repeat aria-disabled:[image-rendering:pixelated] pl-2 pt-1 pr-2 pb-1 text-[#ffffff] text-style-button-bold',
        // white
        '2': 'inline-block min-w-2 min-h-5.75 aria-disabled:pointer-events-none [background-image:var(--buttonthick-0-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] hover:[background-image:var(--buttonthick-0-hovering-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] active:[background-image:var(--buttonthick-0-pressed-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated] aria-disabled:[background-image:var(--buttonthick-0-disabled-src)] aria-disabled:bg-size-[100%_100%] aria-disabled:bg-no-repeat aria-disabled:[image-rendering:pixelated] pl-2 pt-1 pr-2 pb-1 text-[#000000] text-style-button-bold',
        // default
        '3': '[border-image-source:var(--buttonthick-3-default-src)] [border-image-slice:5_5_5_5_fill] [border-image-width:5px_5px_5px_5px] [border-image-repeat:stretch] [image-rendering:pixelated] hover:[border-image-source:var(--buttonthick-3-hovering-src)] hover:[border-image-slice:5_5_5_5_fill] hover:[border-image-width:5px_5px_5px_5px] hover:[border-image-repeat:stretch] hover:[image-rendering:pixelated] active:[border-image-source:var(--buttonthick-3-pressed-src)] active:[border-image-slice:5_5_5_5_fill] active:[border-image-width:5px_5px_5px_5px] active:[border-image-repeat:stretch] active:[image-rendering:pixelated] aria-disabled:[border-image-source:var(--buttonthick-3-disabled-src)] aria-disabled:[border-image-slice:5_5_5_5_fill] aria-disabled:[border-image-width:5px_5px_5px_5px] aria-disabled:[border-image-repeat:stretch] aria-disabled:[image-rendering:pixelated] min-w-5 min-h-5.5 pl-2.5 pt-0.5 pr-2.5 pb-0.75 text-[#000000] text-style-button-shiny-bold',
        // black
        '4': '[border-image-source:var(--buttonthick-4-default-src)] [border-image-slice:5_5_5_5_fill] [border-image-width:5px_5px_5px_5px] [border-image-repeat:stretch] [image-rendering:pixelated] hover:[border-image-source:var(--buttonthick-4-hovering-src)] hover:[border-image-slice:5_5_5_5_fill] hover:[border-image-width:5px_5px_5px_5px] hover:[border-image-repeat:stretch] hover:[image-rendering:pixelated] active:[border-image-source:var(--buttonthick-4-pressed-src)] active:[border-image-slice:5_5_5_5_fill] active:[border-image-width:5px_5px_5px_5px] active:[border-image-repeat:stretch] active:[image-rendering:pixelated] aria-disabled:[border-image-source:var(--buttonthick-4-disabled-src)] aria-disabled:[border-image-slice:5_5_5_5_fill] aria-disabled:[border-image-width:5px_5px_5px_5px] aria-disabled:[border-image-repeat:stretch] aria-disabled:[image-rendering:pixelated] min-w-5 min-h-7 pl-2.5 pt-1.25 pr-2.5 pb-1.5 text-[#ffffff] text-style-button-shiny-bold',
        // white
        '5': '[border-image-source:var(--buttonthick-3-default-src)] [border-image-slice:5_5_5_5_fill] [border-image-width:5px_5px_5px_5px] [border-image-repeat:stretch] [image-rendering:pixelated] hover:[border-image-source:var(--buttonthick-3-hovering-src)] hover:[border-image-slice:5_5_5_5_fill] hover:[border-image-width:5px_5px_5px_5px] hover:[border-image-repeat:stretch] hover:[image-rendering:pixelated] active:[border-image-source:var(--buttonthick-3-pressed-src)] active:[border-image-slice:5_5_5_5_fill] active:[border-image-width:5px_5px_5px_5px] active:[border-image-repeat:stretch] active:[image-rendering:pixelated] aria-disabled:[border-image-source:var(--buttonthick-3-disabled-src)] aria-disabled:[border-image-slice:5_5_5_5_fill] aria-disabled:[border-image-width:5px_5px_5px_5px] aria-disabled:[border-image-repeat:stretch] aria-disabled:[image-rendering:pixelated] min-w-5 min-h-7 pl-2.5 pt-1.25 pr-2.5 pb-1.5 text-[#ffffff] text-style-button-shiny-bold',
        // green
        '6': '[border-image-source:var(--buttonthick-3-default-src)] [border-image-slice:5_5_5_5_fill] [border-image-width:5px_5px_5px_5px] [border-image-repeat:stretch] [image-rendering:pixelated] hover:[border-image-source:var(--buttonthick-3-hovering-src)] hover:[border-image-slice:5_5_5_5_fill] hover:[border-image-width:5px_5px_5px_5px] hover:[border-image-repeat:stretch] hover:[image-rendering:pixelated] active:[border-image-source:var(--buttonthick-3-pressed-src)] active:[border-image-slice:5_5_5_5_fill] active:[border-image-width:5px_5px_5px_5px] active:[border-image-repeat:stretch] active:[image-rendering:pixelated] aria-disabled:[border-image-source:var(--buttonthick-3-disabled-src)] aria-disabled:[border-image-slice:5_5_5_5_fill] aria-disabled:[border-image-width:5px_5px_5px_5px] aria-disabled:[border-image-repeat:stretch] aria-disabled:[image-rendering:pixelated] min-w-5 min-h-7 pl-2.5 pt-1.25 pr-2.5 pb-1.5 text-[#ffffff] text-style-button-shiny-bold',
    },
} as const;

const buttonThickOverlayVariantsConfig = {
    variant: {
        // default
        '0': '',
        // black
        '1': '',
        // white
        '2': '',
        // default
        '3': '',
        // black
        '4': '',
        // white
        '5': '',
        // green
        '6': '',
    },
} as const;

const buttonThickTintColors: Partial<Record<string, string>> = {
    '6': '#00aa00',
};

const buttonThickTintableVars: Partial<Record<string, string[]>> = {
    '0': ['buttonthick-0-default-src', 'buttonthick-0-hovering-src', 'buttonthick-0-pressed-src', 'buttonthick-0-disabled-src'],
    '1': ['buttonthick-1-default-src', 'buttonthick-1-hovering-src', 'buttonthick-1-pressed-src', 'buttonthick-1-disabled-src'],
    '2': ['buttonthick-0-default-src', 'buttonthick-0-hovering-src', 'buttonthick-0-pressed-src', 'buttonthick-0-disabled-src'],
    '3': ['buttonthick-3-default-src', 'buttonthick-3-hovering-src', 'buttonthick-3-pressed-src', 'buttonthick-3-disabled-src'],
    '4': ['buttonthick-4-default-src', 'buttonthick-4-hovering-src', 'buttonthick-4-pressed-src', 'buttonthick-4-disabled-src'],
    '5': ['buttonthick-3-default-src', 'buttonthick-3-hovering-src', 'buttonthick-3-pressed-src', 'buttonthick-3-disabled-src'],
    '6': ['buttonthick-3-default-src', 'buttonthick-3-hovering-src', 'buttonthick-3-pressed-src', 'buttonthick-3-disabled-src'],
};

const buttonThickVariants = cva('', { variants: buttonThickVariantsConfig, defaultVariants: { variant: '0' } });
const buttonThickOverlayVariants = cva('', { variants: buttonThickOverlayVariantsConfig, defaultVariants: { variant: '0' } });

type ButtonThickVariantProps = VariantProps<typeof buttonThickVariantsConfig>;

interface ButtonThickProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonThickVariantProps {
    className?: string;
    tintColor?: string;
    defaultVariant?: string;
}

export const ButtonThick = forwardRef<HTMLButtonElement, ButtonThickProps>(
    ({ className, variant, defaultVariant, tintColor, style, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('buttonThick');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['buttonThick']?.[resolvedVariant];
        const resolvedTint = tintColor || buttonThickTintColors[resolvedVariant as string];
        const overlayClassName = buttonThickOverlayVariants({ variant: resolvedVariant });
        const tintStyle = useTintedVars(buttonThickTintableVars[resolvedVariant as string], resolvedTint);

        return (
            <button
                ref={ref}
                className={cn(buttonThickVariants({ variant: resolvedVariant }), overlayClassName && 'relative', className)}
                style={{ ...style, ...tintStyle }}
                {...props}
            >
                {overlayClassName && <div aria-hidden className={cn('pointer-events-none absolute inset-0', overlayClassName)} />}
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </button>
        );
    }
);

ButtonThick.displayName = 'ButtonThick';
