import { cva } from '#base/utils';

const borderArtVariantsConfig = {
    variant: {
        // white with sharper corners
        '3': '[border-image-source:var(--border-3-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch]',
        // white with thin dark border
        '4': '[border-image-source:var(--border-4-default-src)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px_6px_6px_6px] [border-image-repeat:stretch]',
        // white with thin dark border and sharper corners
        '5': '[border-image-source:var(--border-5-default-src)] [border-image-slice:5_5_5_5_fill] [border-image-width:5px_5px_5px_5px] [border-image-repeat:stretch]',
        // grey with thick border
        '6': '[border-image-source:var(--border-6-default-src)] [border-image-slice:8_8_8_8_fill] [border-image-width:8px_8px_8px_8px] [border-image-repeat:stretch]',
        // grey with thin border
        '7': '[border-image-source:var(--border-7-default-src)] [border-image-slice:6_6_7_6_fill] [border-image-width:6px_6px_7px_6px] [border-image-repeat:stretch]',
        // white with thick dark border
        '8': '[border-image-source:var(--border-8-default-src)] [border-image-slice:10_10_10_10_fill] [border-image-width:10px_10px_10px_10px] [border-image-repeat:stretch]',
        // transp. grey with thick border
        '9': '[border-image-source:var(--border-9-default-src)] [border-image-slice:7_7_8_7_fill] [border-image-width:7px_7px_8px_7px] [border-image-repeat:stretch]',
        // white with drop shadow
        '10': '[border-image-source:var(--border-10-default-src)] [border-image-slice:6_6_8_6_fill] [border-image-width:6px_6px_8px_6px] [border-image-repeat:stretch]',
        // white with thin light border
        '0': '[border-image-source:var(--border-0-default-src)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px_6px_6px_6px] [border-image-repeat:stretch]',
        // black borderless
        '1': '[border-image-source:var(--border-1-default-src)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px_6px_6px_6px] [border-image-repeat:stretch]',
        // white borderless
        '2': '[border-image-source:var(--border-2-default-src)] [border-image-slice:6_6_6_6_fill] [border-image-width:6px_6px_6px_6px] [border-image-repeat:stretch]',
        // default
        '100': '[border-image-source:var(--border-100-default-src)] [border-image-slice:3_3_3_3] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch]',
        // frame
        '101': '[background-image:var(--border-101-default-src)] bg-size-[100%_100%] bg-no-repeat',
        // sunk
        '102': '[background-image:var(--border-102-default-src)] bg-size-[100%_100%] bg-no-repeat',
        // light
        '103': '[background-image:var(--border-103-default-src)] bg-size-[100%_100%] bg-no-repeat',
        // raised
        '104': '[border-image-source:var(--border-104-default-src)] [border-image-slice:7_7_7_7_fill] [border-image-width:7px_7px_7px_7px] [border-image-repeat:stretch]',
        // input
        '105': '[background-image:var(--border-105-default-src)] bg-size-[100%_100%] bg-no-repeat',
        // chat bubble
        '106': '[background-image:var(--border-106-default-src)] bg-size-[100%_100%] bg-no-repeat',
        // balloon
        '107': '[background-image:var(--border-107-default-src)] bg-size-[100%_100%] bg-no-repeat',
        // info box
        '108': '[border-image-source:var(--border-108-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch]',
        // default
        '200': '[border-image-source:var(--border-200-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch]',
    },
} as const;

/** Intrinsic sizing and inherited text color, which belong to the box itself rather than to its art layer. */
const borderBoxVariantsConfig = {
    variant: {
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': '',
        '8': '',
        '9': '',
        '10': '',
        '0': '',
        '1': 'text-white',
        '2': '',
        '100': '',
        '101': 'inline-block min-w-2.75 min-h-3.25',
        '102': 'inline-block min-w-7.5 min-h-7.5',
        '103': 'inline-block min-w-2.25 min-h-5',
        '104': '',
        '105': 'inline-block min-w-7.25 min-h-7.25',
        '106': 'inline-block min-w-7.25 min-h-3.25',
        '107': 'inline-block min-w-3.5 min-h-4.25',
        '108': '',
        '200': '',
    },
} as const;

const borderOverlayVariantsConfig = {
    variant: {
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': '',
        '8': '',
        '9': '',
        '10': '',
        '0': '',
        '1': '',
        '2': '',
        '100': '',
        '101': '',
        '102': '',
        '103': '',
        // raised
        '104': '[background-image:var(--border-104-default-shine-src)] bg-size-[100%_100%] bg-no-repeat',
        // input
        '105': '[background-image:var(--border-105-default-shine-src)] bg-size-[100%_100%] bg-no-repeat',
        '106': '',
        '107': '',
        '108': '',
        '200': '',
    },
} as const;

/** This component's own default tint per variant, from the skin's own `<window color="…">` — a caller-supplied `tintColor` prop always overrides this. */
export const borderTintColors: Partial<Record<string, string>> = {
    '108': '#676767',
};

/** Which CSS vars (bare, no `--`) each variant's own art actually needs recolored — see `#base/useTintedVars`. */
export const borderTintableVars: Partial<Record<string, string[]>> = {
    '3': ['border-3-default-src'],
    '4': ['border-4-default-src'],
    '5': ['border-5-default-src'],
    '6': ['border-6-default-src'],
    '7': ['border-7-default-src'],
    '8': ['border-8-default-src'],
    '9': ['border-9-default-src'],
    '10': ['border-10-default-src'],
    '0': ['border-0-default-src'],
    '1': ['border-1-default-src'],
    '2': ['border-2-default-src'],
    '103': ['border-103-default-src'],
    '104': ['border-104-default-src'],
    '105': ['border-105-default-src'],
    '107': ['border-107-default-src'],
    '108': ['border-108-default-src'],
};

export const borderArtVariants = cva('', { variants: borderArtVariantsConfig, defaultVariants: { variant: '0' } });
export const borderBoxVariants = cva('', { variants: borderBoxVariantsConfig, defaultVariants: { variant: '0' } });
export const borderOverlayVariants = cva('', { variants: borderOverlayVariantsConfig, defaultVariants: { variant: '0' } });

export type BorderVariantsConfig = typeof borderArtVariantsConfig;
