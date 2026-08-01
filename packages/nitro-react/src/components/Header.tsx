import { forwardRef, type HTMLAttributes } from 'react';

import { useTintedVars } from '#base/utils';
import { cn, cva, type VariantProps } from '#base/utils';

import { CloseButton } from './CloseButton';

const headerVariantsConfig = {
    variant: {
        // blue
        '0': 'inline-block min-h-3.75 max-h-3.75 [background-image:var(--header-0-default-src)] bg-size-auto bg-repeat m-1.5 text-[#FFFFFF] text-style-frame-title',
        // black
        '1': 'inline-block min-h-3.75 max-h-3.75 [background-image:var(--header-0-default-src)] bg-size-auto bg-repeat m-1.5 text-[#FFFFFF] text-style-frame-title',
        // yellow
        '2': 'inline-block min-h-3.75 max-h-3.75 [background-image:var(--header-0-default-src)] bg-size-auto bg-repeat m-1.5 text-[#000000] text-style-frame-title',
        // default
        '3': 'inline-block min-h-8.25 max-h-8.25 text-[#ffffff] text-style-u-frame-title',
        // light
        '4': 'inline-block min-w-1.5 min-h-5 [background-image:var(--header-3-default-src)] bg-size-[100%_100%] bg-no-repeat pl-2 pt-px pr-2 pb-px text-[#ffffff] text-style-u-frame-title',
        // bubble — graphics asset has no usable "default" state
        '7': 'min-w-16 min-h-8.25 pl-2 pt-px pr-2 pb-px text-[#ffffff] text-style-u-frame-title',
        // default
        '200': '[border-image-source:var(--border-200-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] [border-image-repeat:stretch] pl-2.5 pt-0.5 pr-2.5 pb-0.5 text-[#ffffff] text-style-u-frame-title',
    },
} as const;

const headerOverlayVariantsConfig = {
    variant: {
        // blue
        '0': '[background-image:var(--header-0-default-shine-src)] bg-size-auto bg-repeat',
        // black
        '1': '[background-image:var(--header-0-default-shine-src)] bg-size-auto bg-repeat',
        // yellow
        '2': '[background-image:var(--header-0-default-shine-src)] bg-size-auto bg-repeat',
        // default
        '3': '',
        // light
        '4': '',
        // bubble — graphics asset has no usable "default" state
        '7': '',
        // default
        '200': '',
    },
} as const;

/** This component's own default tint per variant, from the skin's own `<window color="…">` — a caller-supplied `tintColor` prop always overrides this. */
const headerTintColors: Partial<Record<string, string>> = {
    '0': '#418db0',
    '1': '#4c4c4c',
    '2': '#fac200',
};

/** Which CSS vars (bare, no `--`) each variant's own art actually needs recolored — see `#base/useTintedVars`. */
const headerTintableVars: Partial<Record<string, string[]>> = {
    '0': ['header-0-default-src'],
    '1': ['header-0-default-src'],
    '2': ['header-0-default-src'],
    '3': ['header-3-default-src'],
    '4': ['header-3-default-src'],
};

const headerVariants = cva('relative overflow-hidden', { variants: headerVariantsConfig, defaultVariants: { variant: '0' } });
const headerOverlayVariants = cva('', { variants: headerOverlayVariantsConfig, defaultVariants: { variant: '0' } });

type HeaderVariantProps = VariantProps<typeof headerVariantsConfig>;

interface HeaderProps extends HTMLAttributes<HTMLDivElement>, HeaderVariantProps {
    caption: string;
    closeVariant?: string;
    className?: string;
    tintColor?: string;
    onClose?: () => void;
}

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
    ({ caption, closeVariant, className, variant, tintColor, onClose, style, children, ...props }, ref) => {
        const resolvedVariant = variant ?? '0';
        const resolvedTint = tintColor || headerTintColors[resolvedVariant];
        const overlayClassName = headerOverlayVariants({ variant });
        const tintStyle = useTintedVars(headerTintableVars[resolvedVariant], resolvedTint);

        return (
            <div
                ref={ref}
                className={cn(headerVariants({ variant }), overlayClassName && 'relative', className)}
                style={{ ...style, ...tintStyle }}
                {...props}
            >
                {overlayClassName && <div aria-hidden className={cn('pointer-events-none absolute inset-0', overlayClassName)} />}
                <div className="flex items-center justify-center h-full px-2">
                    <span className="flex-1 text-center">{caption}</span>
                    <CloseButton variant={closeVariant as undefined} className="shrink-0" onClick={onClose} data-no-drag />
                </div>
                {children}
            </div>
        );
    }
);

Header.displayName = 'Header';
