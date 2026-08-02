import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, useTintedVars, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const borderVariantsConfig = {
    variant: {
        // white with thin light border
        '0': '[border-image-source:var(--border-0-default-src)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px_6px_6px_6px] nine-slice-border',
        // black borderless
        '1': '[border-image-source:var(--border-1-default-src)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px_6px_6px_6px] nine-slice-border text-white',
        // white borderless
        '2': '[border-image-source:var(--border-2-default-src)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px_6px_6px_6px] nine-slice-border',
        // white with sharper corners
        '3': '[border-image-source:var(--border-3-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] nine-slice-border',
        // white with thin dark border
        '4': '[border-image-source:var(--border-4-default-src)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px_6px_6px_6px] nine-slice-border',
        // white with thin dark border and sharper corners
        '5': '[border-image-source:var(--border-5-default-src)] [border-image-slice:5_5_5_5_fill] [border-image-width:5px_5px_5px_5px] nine-slice-border',
        // grey with thick border
        '6': '[border-image-source:var(--border-6-default-src)] [border-image-slice:8_8_8_8_fill] [border-image-width:8px_8px_8px_8px] nine-slice-border',
        // grey with thin border
        '7': '[border-image-source:var(--border-7-default-src)] [border-image-slice:6_6_7_6_fill] [border-image-width:6px_6px_7px_6px] nine-slice-border',
        // white with thick dark border
        '8': '[border-image-source:var(--border-8-default-src)] [border-image-slice:10_10_10_10_fill] [border-image-width:10px_10px_10px_10px] nine-slice-border',
        // transp. grey with thick border
        '9': '[border-image-source:var(--border-9-default-src)] [border-image-slice:7_7_8_7_fill] [border-image-width:7px_7px_8px_7px] nine-slice-border',
        // white with drop shadow
        '10': '[border-image-source:var(--border-10-default-src)] [border-image-slice:6_6_8_6_fill] [border-image-width:6px_6px_8px_6px] nine-slice-border',
        // default
        '100': '[border-image-source:var(--border-100-default-src)] [border-image-slice:3_3_3_3] [border-image-width:3px_3px_3px_3px] nine-slice-border',
        // frame
        '101': '[background-image:var(--border-101-default-top-left-src),_var(--border-101-default-top-center-src),_var(--border-101-default-top-right-src),_var(--border-101-default-center-left-src),_var(--border-101-default-center-center-src),_var(--border-101-default-center-left-src),_var(--border-101-default-bottom-left-src),_var(--border-101-default-bottom-center-src),_var(--border-101-default-bottom-right-src)] [background-position:left_0px_top_0px,_left_4px_top_0px,_right_0px_top_0px,_left_0px_top_4px,_left_1px_top_4px,_right_0px_top_4px,_left_0px_bottom_0px,_left_4px_bottom_0px,_right_0px_bottom_0px] [background-size:4px_4px,_calc(100%_-_4px_-_4px)_4px,_4px_4px,_1px_calc(100%_-_4px_-_7px),_calc(100%_-_1px_-_1px)_calc(100%_-_4px_-_7px),_1px_calc(100%_-_4px_-_7px),_4px_7px,_calc(100%_-_4px_-_4px)_7px,_4px_7px] [background-repeat:no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat] [image-rendering:pixelated]',
        // sunk
        '102': '[background-image:var(--border-102-default-top-left-src),_var(--border-102-default-top-center-src),_var(--border-102-default-top-right-src),_var(--border-102-default-center-left-src),_var(--border-102-default-center-center-src),_var(--border-102-default-center-right-src),_var(--border-102-default-bottom-left-src),_var(--border-102-default-bottom-center-src),_var(--border-102-default-bottom-right-src)] [background-position:left_0px_top_0px,_left_12px_top_0px,_right_0px_top_0px,_left_0px_top_14px,_left_8px_top_14px,_right_0px_top_14px,_left_0px_bottom_0px,_left_8px_bottom_0px,_right_0px_bottom_0px] [background-size:12px_14px,_calc(100%_-_12px_-_6px)_14px,_6px_14px,_8px_calc(100%_-_14px_-_4px),_calc(100%_-_8px_-_1px)_calc(100%_-_14px_-_4px),_1px_calc(100%_-_14px_-_4px),_8px_4px,_calc(100%_-_8px_-_4px)_4px,_4px_4px] [background-repeat:no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat] [image-rendering:pixelated]',
        // light
        '103': '[background-image:var(--border-103-default-top-src),_var(--border-103-default-center-src),_var(--border-103-default-bottom-left-src),_var(--border-103-default-bottom-center-src),_var(--border-103-default-bottom-right-src)] [background-position:left_0px_top_0px,_left_0px_top_4px,_left_0px_bottom_0px,_left_4px_bottom_0px,_right_0px_bottom_0px] [background-size:100%_4px,_100%_calc(100%_-_4px_-_12px),_4px_12px,_calc(100%_-_4px_-_4px)_12px,_4px_12px] [background-repeat:no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat] [image-rendering:pixelated]',
        // raised
        '104': '[border-image-source:var(--border-104-default-src)] [border-image-slice:7_7_7_7_fill] [border-image-width:7px_7px_7px_7px] nine-slice-border',
        // input
        '105': 'inline-block min-w-7.25 min-h-7.25 [background-image:var(--border-105-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated]',
        // chat bubblemin-w-7.25min-h-7.25bg-size-[100%_100%]bg-no-repeat
        '106': '[background-image:var(--border-106-default-top-left-src),_var(--border-106-default-top-center-src),_var(--border-106-default-top-right-src),_var(--border-106-default-center-src),_var(--border-106-default-bottom-left-src),_var(--border-106-default-bottom-center-src),_var(--border-106-default-bottom-right-src)] [background-position:left_0px_top_0px,_left_4px_top_0px,_right_0px_top_0px,_left_0px_top_5px,_left_0px_bottom_0px,_left_4px_bottom_0px,_right_0px_bottom_0px] [background-size:4px_5px,_calc(100%_-_4px_-_4px)_5px,_4px_5px,_100%_calc(100%_-_5px_-_7px),_4px_7px,_calc(100%_-_4px_-_4px)_7px,_4px_7px] [background-repeat:no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat] [image-rendering:pixelated]',
        // balloon
        '107': '[background-image:var(--border-107-default-background-top-left-src),_var(--border-107-default-background-top-center-src),_var(--border-107-default-background-top-right-src),_var(--border-107-default-background-center-left-src),_var(--border-107-default-background-center-center-src),_var(--border-107-default-background-center-left-src),_var(--border-107-default-background-bottom-left-src),_var(--border-107-default-background-bottom-center-src),_var(--border-107-default-background-bottom-right-src)] [background-position:left_0px_top_0px,_left_5px_top_0px,_right_0px_top_0px,_left_0px_top_10px,_left_1px_top_10px,_right_0px_top_10px,_left_0px_bottom_0px,_left_5px_bottom_0px,_right_0px_bottom_0px] [background-size:5px_10px,_calc(100%_-_5px_-_5px)_10px,_5px_10px,_1px_calc(100%_-_10px_-_5px),_calc(100%_-_1px_-_1px)_calc(100%_-_10px_-_5px),_1px_calc(100%_-_10px_-_5px),_5px_5px,_calc(100%_-_5px_-_5px)_5px,_5px_5px] [background-repeat:no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat] [image-rendering:pixelated]',
        // info box
        '108': '[border-image-source:var(--border-108-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] nine-slice-border',
        // default
        '200': '[border-image-source:var(--border-200-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] nine-slice-border',
    },
} as const;

const borderOverlayVariantsConfig = {
    variant: {
        // white with thin light border
        '0': '',
        // black borderless
        '1': '',
        // white borderless
        '2': '',
        // white with sharper corners
        '3': '',
        // white with thin dark border
        '4': '',
        // white with thin dark border and sharper corners
        '5': '',
        // grey with thick border
        '6': '',
        // grey with thin border
        '7': '',
        // white with thick dark border
        '8': '',
        // transp. grey with thick border
        '9': '',
        // white with drop shadow
        '10': '',
        // default
        '100': '',
        // frame
        '101': '',
        // sunk
        '102': '',
        // light
        '103': '',
        // raised
        '104': '[background-image:var(--border-104-default-border-top-left-src),_var(--border-104-default-border-top-center-src),_var(--border-104-default-border-top-right-src),_var(--border-104-default-border-center-left-src),_var(--border-104-default-border-center-left-src),_var(--border-104-default-border-bottom-left-src),_var(--border-104-default-border-bottom-center-src),_var(--border-104-default-border-bottom-right-src)] [background-position:left_0px_top_0px,_left_4px_top_0px,_right_0px_top_0px,_left_0px_top_4px,_right_0px_top_4px,_left_0px_bottom_0px,_left_4px_bottom_0px,_right_0px_bottom_0px] [background-size:4px_4px,_calc(100%_-_4px_-_4px)_4px,_4px_4px,_1px_calc(100%_-_4px_-_5px),_1px_calc(100%_-_4px_-_5px),_4px_5px,_calc(100%_-_4px_-_4px)_5px,_4px_5px] [background-repeat:no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat] [image-rendering:pixelated]',
        // input
        '105': '[background-image:var(--border-105-default-shine-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated]',
        // chat bubblebg-size-[100%_100%]bg-no-repeat
        '106': '',
        // balloon
        '107': '',
        // info box
        '108': '',
        // default
        '200': '',
    },
} as const;

const borderTintColors: Partial<Record<string, string>> = {
    '108': '#676767',
};

const borderTintableVars: Partial<Record<string, string[]>> = {
    '0': ['border-0-default-src'],
    '1': ['border-1-default-src'],
    '2': ['border-2-default-src'],
    '3': ['border-3-default-src'],
    '4': ['border-4-default-src'],
    '5': ['border-5-default-src'],
    '6': ['border-6-default-src'],
    '7': ['border-7-default-src'],
    '8': ['border-8-default-src'],
    '9': ['border-9-default-src'],
    '10': ['border-10-default-src'],
    '103': ['border-103-default-top-src', 'border-103-default-center-src', 'border-103-default-bottom-left-src', 'border-103-default-bottom-center-src', 'border-103-default-bottom-right-src'],
    '104': ['border-104-default-src'],
    '105': ['border-105-default-src'],
    '107': ['border-107-default-background-top-left-src', 'border-107-default-background-top-center-src', 'border-107-default-background-top-right-src', 'border-107-default-background-center-left-src', 'border-107-default-background-center-center-src', 'border-107-default-background-bottom-left-src', 'border-107-default-background-bottom-center-src', 'border-107-default-background-bottom-right-src'],
    '108': ['border-108-default-src'],
};

const borderVariants = cva('', { variants: borderVariantsConfig, defaultVariants: { variant: '0' } });
const borderOverlayVariants = cva('', { variants: borderOverlayVariantsConfig, defaultVariants: { variant: '0' } });

type BorderVariantProps = VariantProps<typeof borderVariantsConfig>;

interface BorderProps extends HTMLAttributes<HTMLDivElement>, BorderVariantProps {
    className?: string;
    tintColor?: string;
    defaultVariant?: string;
}

export const Border = forwardRef<HTMLDivElement, BorderProps>(
    ({ className, variant, defaultVariant, tintColor, style, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('border');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['border']?.[resolvedVariant as string];
        const resolvedTint = tintColor || borderTintColors[resolvedVariant as string];
        const overlayClassName = borderOverlayVariants({ variant: resolvedVariant });
        const tintStyle = useTintedVars(borderTintableVars[resolvedVariant as string], resolvedTint);

        return (
            <div
                ref={ref}
                className={cn(borderVariants({ variant: resolvedVariant }), overlayClassName && 'relative', className)}
                style={{ ...style, ...tintStyle }}
                {...props}
            >
                {overlayClassName && <div aria-hidden className={cn('pointer-events-none absolute inset-0', overlayClassName)} />}
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

Border.displayName = 'Border';
