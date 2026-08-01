import { forwardRef, type HTMLAttributes } from 'react';

import { useTintedVars } from '#base/utils';
import { cn, cva, type VariantProps } from '#base/utils';


const dropmenuVariantsConfig = {
    variant: {
        // default
        '0': '[border-image-source:var(--dropmenu-0-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch] [image-rendering:pixelated] min-w-10 min-h-5.5 text-[#000000] text-style-regular',
        // black
        '1': '[border-image-source:var(--button-1-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch] [image-rendering:pixelated] min-w-10 min-h-5.5 text-[#ffffff] text-style-regular',
        // default
        '3': 'inline-block min-w-10 min-h-5.75 [background-image:var(--dropmenu-3-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] hover:[background-image:var(--dropmenu-3-hovering-src)] hover:bg-size-[100%_100%] hover:bg-no-repeat hover:[image-rendering:pixelated] text-[#000000] text-style-u-regular',
        // default
        '100': '[border-image-source:var(--dropmenu-0-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch] [image-rendering:pixelated] min-w-10 min-h-5.5 text-[#000000] text-style-il-regular',
    },
} as const;

const dropmenuOverlayVariantsConfig = {
    variant: {
        // default
        '0': '[background-image:var(--dropmenu-0-default-arrow-src)] bg-position-[right_5px_top_2px] bg-size-[16px_16px] [background-repeat:no-repeat_no-repeat] [image-rendering:pixelated]',
        // black
        '1': '[background-image:var(--dropmenu-1-default-arrow-src)] bg-position-[right_5px_top_2px] bg-size-[16px_16px] [background-repeat:no-repeat_no-repeat] [image-rendering:pixelated]',
        // default
        '3': '',
        // default
        '100': '[background-image:var(--dropmenu-0-default-arrow-src)] bg-position-[right_5px_top_2px] bg-size-[16px_16px] [background-repeat:no-repeat_no-repeat] [image-rendering:pixelated]',
    },
} as const;

/** This component's own default tint per variant, from the skin's own `<window color="…">` — a caller-supplied `tintColor` prop always overrides this. */
const dropmenuTintColors: Partial<Record<string, string>> = {

};

/** Which CSS vars (bare, no `--`) each variant's own art actually needs recolored — see `#base/useTintedVars`. */
const dropmenuTintableVars: Partial<Record<string, string[]>> = {
    '0': ['dropmenu-0-default-src'],
    '1': ['button-1-default-src'],
    '3': ['dropmenu-3-default-src', 'dropmenu-3-hovering-src'],
    '100': ['dropmenu-0-default-src'],
};

const dropmenuVariants = cva('relative flex flex-col h-full', { variants: dropmenuVariantsConfig, defaultVariants: { variant: '0' } });
const dropmenuOverlayVariants = cva('', { variants: dropmenuOverlayVariantsConfig, defaultVariants: { variant: '0' } });

type DropmenuVariantProps = VariantProps<typeof dropmenuVariantsConfig>;

interface DropmenuProps extends HTMLAttributes<HTMLDivElement>, DropmenuVariantProps {
    className?: string;
    /** Recolors this variant's tintable art at runtime — overrides this variant's own default color from the skin, if it has one (see `#base/pixiTint`). */
    tintColor?: string;
    options?: string[];
}

export const Dropmenu = forwardRef<HTMLDivElement, DropmenuProps>(
    ({ className, variant, tintColor, options, style, children, ...props }, ref) => {
        const resolvedVariant = variant ?? '0';
        const resolvedTint = tintColor || dropmenuTintColors[resolvedVariant];
        const overlayClassName = dropmenuOverlayVariants({ variant });
        const tintStyle = useTintedVars(dropmenuTintableVars[resolvedVariant], resolvedTint);

        return (
            <div
                ref={ref}
                className={cn(dropmenuVariants({ variant }), overlayClassName && 'relative', className)}
                style={{ ...style, ...tintStyle }}
                {...props}
            >
                {overlayClassName && <div aria-hidden className={cn('pointer-events-none absolute inset-0', overlayClassName)} />}
                <div className="absolute left-1.5 top-0.5 w-full h-4.5">
                </div>
                {children}
            </div>
        );
    }
);

Dropmenu.displayName = 'Dropmenu';
