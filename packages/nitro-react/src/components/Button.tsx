import { ButtonHTMLAttributes, forwardRef } from 'react';

import { useTintedVars } from '#base/utils';
import { cn, cva, type VariantProps } from '#base/utils';

const buttonVariantsConfig = {
    variant: {
        // default
        '0': '[border-image-source:var(--button-0-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-0-hovering-src)] hover:[border-image-slice:3_3_3_3_fill] hover:[border-image-width:3px_3px_3px_3px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--button-0-pressed-src)] active:[border-image-slice:3_3_3_3_fill] active:[border-image-width:3px_3px_3px_3px] active:[border-image-repeat:stretch] aria-disabled:[border-image-source:var(--button-0-disabled-src)] aria-disabled:[border-image-slice:3_3_3_3_fill] aria-disabled:[border-image-width:3px_3px_3px_3px] aria-disabled:[border-image-repeat:stretch] min-w-5 min-h-5.5 pl-2 pt-1 pr-2 pb-1 text-[#000000] text-style-button-regular',
        // black
        '1': '[border-image-source:var(--button-1-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-1-hovering-src)] hover:[border-image-slice:3_3_3_3_fill] hover:[border-image-width:3px_3px_3px_3px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--border-3-default-src)] active:[border-image-slice:3_3_3_3_fill] active:[border-image-width:3px_3px_3px_3px] active:[border-image-repeat:stretch] aria-disabled:[border-image-source:var(--button-1-disabled-src)] aria-disabled:[border-image-slice:3_3_3_3_fill] aria-disabled:[border-image-width:3px_3px_3px_3px] aria-disabled:[border-image-repeat:stretch] min-w-5 min-h-5.5 pl-2 pt-1 pr-2 pb-1 text-[#ffffff] text-style-button-regular',
        // white
        '2': '[border-image-source:var(--button-0-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-0-hovering-src)] hover:[border-image-slice:3_3_3_3_fill] hover:[border-image-width:3px_3px_3px_3px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--button-0-pressed-src)] active:[border-image-slice:3_3_3_3_fill] active:[border-image-width:3px_3px_3px_3px] active:[border-image-repeat:stretch] aria-disabled:[border-image-source:var(--button-0-disabled-src)] aria-disabled:[border-image-slice:3_3_3_3_fill] aria-disabled:[border-image-width:3px_3px_3px_3px] aria-disabled:[border-image-repeat:stretch] min-w-5 min-h-5.5 pl-2 pt-1 pr-2 pb-1 text-[#000000] text-style-button-regular',
        // default
        '3': '[border-image-source:var(--button-3-default-src)] [border-image-slice:5_5_5_5_fill] [border-image-width:5px_5px_5px_5px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-3-hovering-src)] hover:[border-image-slice:5_5_5_5_fill] hover:[border-image-width:5px_5px_5px_5px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--button-3-pressed-src)] active:[border-image-slice:5_5_5_5_fill] active:[border-image-width:5px_5px_5px_5px] active:[border-image-repeat:stretch] aria-disabled:[border-image-source:var(--button-3-disabled-src)] aria-disabled:[border-image-slice:5_5_5_5_fill] aria-disabled:[border-image-width:5px_5px_5px_5px] aria-disabled:[border-image-repeat:stretch] min-w-5 min-h-5.5 pl-2 pt-0.5 pr-2 pb-0.75 text-[#000000] text-style-button-shiny-regular',
        // black
        '4': '[border-image-source:var(--button-4-default-src)] [border-image-slice:5_5_5_5_fill] [border-image-width:5px_5px_5px_5px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-4-hovering-src)] hover:[border-image-slice:5_5_5_5_fill] hover:[border-image-width:5px_5px_5px_5px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--button-4-pressed-src)] active:[border-image-slice:5_5_5_5_fill] active:[border-image-width:5px_5px_5px_5px] active:[border-image-repeat:stretch] aria-disabled:[border-image-source:var(--button-4-disabled-src)] aria-disabled:[border-image-slice:5_5_5_5_fill] aria-disabled:[border-image-width:5px_5px_5px_5px] aria-disabled:[border-image-repeat:stretch] min-w-5 min-h-7 pl-2.5 pt-1.25 pr-2.5 pb-1.5 text-[#ffffff] text-style-button-shiny-regular',
        // white
        '5': '[border-image-source:var(--button-3-default-src)] [border-image-slice:5_5_5_5_fill] [border-image-width:5px_5px_5px_5px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-3-hovering-src)] hover:[border-image-slice:5_5_5_5_fill] hover:[border-image-width:5px_5px_5px_5px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--button-3-pressed-src)] active:[border-image-slice:5_5_5_5_fill] active:[border-image-width:5px_5px_5px_5px] active:[border-image-repeat:stretch] aria-disabled:[border-image-source:var(--button-3-disabled-src)] aria-disabled:[border-image-slice:5_5_5_5_fill] aria-disabled:[border-image-width:5px_5px_5px_5px] aria-disabled:[border-image-repeat:stretch] min-w-5 min-h-7 pl-2.5 pt-1.25 pr-2.5 pb-1.5 text-[#ffffff] text-style-button-shiny-regular',
        // green
        '6': '[border-image-source:var(--button-3-default-src)] [border-image-slice:5_5_5_5_fill] [border-image-width:5px_5px_5px_5px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-3-hovering-src)] hover:[border-image-slice:5_5_5_5_fill] hover:[border-image-width:5px_5px_5px_5px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--button-3-pressed-src)] active:[border-image-slice:5_5_5_5_fill] active:[border-image-width:5px_5px_5px_5px] active:[border-image-repeat:stretch] aria-disabled:[border-image-source:var(--button-3-disabled-src)] aria-disabled:[border-image-slice:5_5_5_5_fill] aria-disabled:[border-image-width:5px_5px_5px_5px] aria-disabled:[border-image-repeat:stretch] min-w-5 min-h-7 pl-2.5 pt-1.25 pr-2.5 pb-1.5 text-[#ffffff] text-style-button-shiny-regular',
        // landing view
        '100': '[border-image-source:var(--button-100-default-src)] [border-image-slice:1_1_1_1] [border-image-width:1px_1px_1px_1px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-100-hovering-src)] hover:[border-image-slice:19_19_19_19] hover:[border-image-width:19px_19px_19px_19px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--button-100-hovering-src)] active:[border-image-slice:19_19_19_19] active:[border-image-width:19px_19px_19px_19px] active:[border-image-repeat:stretch] min-w-12 min-h-12 pl-6 pt-3.5 pr-6 pb-3.5 text-[#000000] text-style-il-button',
        // window
        '101': '[border-image-source:var(--button-100-default-src)] [border-image-slice:1_1_1_1] [border-image-width:1px_1px_1px_1px] [border-image-repeat:stretch] hover:[border-image-source:var(--button-100-hovering-src)] hover:[border-image-slice:19_19_19_19] hover:[border-image-width:19px_19px_19px_19px] hover:[border-image-repeat:stretch] active:[border-image-source:var(--button-100-hovering-src)] active:[border-image-slice:19_19_19_19] active:[border-image-width:19px_19px_19px_19px] active:[border-image-repeat:stretch] min-w-12 min-h-12 pl-6 pt-3.5 pr-6 pb-3.5 text-[#000000] text-style-il-button',
        // plain
        '102': '[border-image-source:var(--button-102-default-src)] [border-image-slice:8_4_8_6_fill] [border-image-width:8px_4px_8px_6px] [border-image-repeat:stretch] active:[border-image-source:var(--button-102-pressed-src)] active:[border-image-slice:8_4_8_6_fill] active:[border-image-width:8px_4px_8px_6px] active:[border-image-repeat:stretch] min-w-7 min-h-7 pl-3.25 pt-0.75 pr-3.25 pb-0.75 text-[#000000] text-style-il-button',
        // unetched
        '103': '[border-image-source:var(--button-103-default-src)] [border-image-slice:8_4_8_6_fill] [border-image-width:8px_4px_8px_6px] [border-image-repeat:stretch] active:[border-image-source:var(--button-103-pressed-src)] active:[border-image-slice:8_4_8_6_fill] active:[border-image-width:8px_4px_8px_6px] active:[border-image-repeat:stretch] min-w-7 min-h-7 pl-3.25 pt-0.75 pr-3.25 pb-0.75 text-[#000000] text-style-il-button',
        // default
        '200': '[border-image-source:var(--button-200-default-src)] [border-image-slice:4_4_5_4_fill] [border-image-width:4px_4px_5px_4px] [border-image-repeat:stretch] min-w-7 min-h-7 pl-3.25 pt-0.75 pr-3.25 pb-0.75 text-[#000000] text-style-id-button',
    },
} as const;

const buttonOverlayVariantsConfig = {
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
        // landing view
        '100': '[background-image:var(--button-100-default-shine-src)] bg-size-[100%_100%] bg-no-repeat hover:[background-image:var(--button-100-default-shine-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] active:[background-image:var(--button-100-pressed-shine-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated]',
        // window
        '101': '[background-image:var(--button-100-default-shine-src)] bg-size-[100%_100%] bg-no-repeat hover:[background-image:var(--button-100-default-shine-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] active:[background-image:var(--button-100-pressed-shine-src)] active:bg-size-[100%_100%] active:bg-no-repeat active:[image-rendering:pixelated]',
        // plain
        '102': '',
        // unetched
        '103': '',
        // default
        '200': '',
    },
} as const;

/** This component's own default tint per variant, from the skin's own `<window color="…">` — a caller-supplied `tintColor` prop always overrides this. */
const buttonTintColors: Partial<Record<string, string>> = {
    '6': '#00aa00',
    '101': '#bbbbbb',
};

/** Which CSS vars (bare, no `--`) each variant's own art actually needs recolored — see `#base/useTintedVars`. */
const buttonTintableVars: Partial<Record<string, string[]>> = {
    '0': ['button-0-default-src', 'button-0-hovering-src', 'button-0-pressed-src', 'button-0-disabled-src'],
    '1': ['button-1-default-src', 'button-1-hovering-src', 'border-3-default-src', 'button-1-disabled-src'],
    '2': ['button-0-default-src', 'button-0-hovering-src', 'button-0-pressed-src', 'button-0-disabled-src'],
    '3': ['button-3-default-src', 'button-3-hovering-src', 'button-3-pressed-src', 'button-3-disabled-src'],
    '4': ['button-4-default-src', 'button-4-hovering-src', 'button-4-pressed-src', 'button-4-disabled-src'],
    '5': ['button-3-default-src', 'button-3-hovering-src', 'button-3-pressed-src', 'button-3-disabled-src'],
    '6': ['button-3-default-src', 'button-3-hovering-src', 'button-3-pressed-src', 'button-3-disabled-src'],
    '100': ['button-100-default-src', 'button-100-hovering-src'],
    '101': ['button-100-default-src', 'button-100-hovering-src'],
    '103': ['button-103-default-src', 'button-103-pressed-src'],
};

const buttonVariants = cva('pointer-events-auto leading-none cursor-pointer', { variants: buttonVariantsConfig, defaultVariants: { variant: '0' } });
const buttonOverlayVariants = cva('', { variants: buttonOverlayVariantsConfig, defaultVariants: { variant: '0' } });

type ButtonVariantProps = VariantProps<typeof buttonVariantsConfig>;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
    className?: string;
    /** Recolors this variant's tintable art at runtime — overrides this variant's own default color from the skin, if it has one (see `#base/pixiTint`). */
    tintColor?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, tintColor, style, children, ...props }, ref) => {
        const resolvedVariant = variant ?? '0';
        const resolvedTint = tintColor || buttonTintColors[resolvedVariant];
        const overlayClassName = buttonOverlayVariants({ variant });
        const tintStyle = useTintedVars(buttonTintableVars[resolvedVariant], resolvedTint);

        return (
            <button
                ref={ref}
                className={cn(buttonVariants({ variant }), overlayClassName && 'relative', className)}
                style={{ ...style, ...tintStyle }}
                {...props}
            >
                {overlayClassName && <div aria-hidden className={cn('pointer-events-none absolute inset-0', overlayClassName)} />}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
