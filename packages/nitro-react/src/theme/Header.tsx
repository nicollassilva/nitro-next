import { forwardRef, type HTMLAttributes } from 'react';

import { CloseButton } from './CloseButton';
import { cn, cva, useCascadedVariant, useTintedVars, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const headerVariantsConfig = {
    variant: {
        // blue
        '0': 'inline-block min-w-6 min-h-3.75 [background-image:var(--header-0-default-src)] bg-size-[6px_15px] bg-repeat-x [image-rendering:pixelated] pl-2 pt-px pr-2 pb-px text-[#000000] text-style-frame-title',
        // black
        '1': 'inline-block min-w-6 min-h-3.75 [background-image:var(--header-0-default-src)] bg-size-[6px_15px] bg-repeat-x [image-rendering:pixelated] pl-2 pt-px pr-2 pb-px text-[#000000] text-style-frame-title',
        // yellow
        '2': 'inline-block min-w-6 min-h-3.75 [background-image:var(--header-0-default-src)] bg-size-[6px_15px] bg-repeat-x [image-rendering:pixelated] pl-2 pt-px pr-2 pb-px text-[#000000] text-style-frame-title',
        // default [background-image:var(--header-3-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated]
        '3': 'inline-block min-h-8.25 max-h-8.25 text-[#ffffff] text-style-u-frame-title',
        // light
        '4': 'inline-block min-w-1.5 min-h-5 [background-image:var(--header-3-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] pl-2 pt-px pr-2 pb-px text-[#ffffff] text-style-u-frame-title',
        // bubble — graphics asset has no usable "default" state
        '7': 'min-w-16 min-h-8.25 pl-2 pt-px pr-2 pb-px text-[#ffffff] text-style-u-frame-title',
        // default
        '200': '[border-image-source:var(--border-200-default-src)] [border-image-slice:3_3_3_3_fill] [border-image-width:3px_3px_3px_3px] nine-slice-border pl-2.5 pt-0.5 pr-2.5 pb-0.5 text-[#ffffff] text-style-u-frame-title',
    },
} as const;

const headerOverlayVariantsConfig = {
    variant: {
        // blue
        '0': '[background-image:var(--header-0-default-shine-src)] bg-size-[6px_15px] bg-repeat-x [image-rendering:pixelated]',
        // black
        '1': '[background-image:var(--header-0-default-shine-src)] bg-size-[6px_15px] bg-repeat-x [image-rendering:pixelated]',
        // yellow
        '2': '[background-image:var(--header-0-default-shine-src)] bg-size-[6px_15px] bg-repeat-x [image-rendering:pixelated]',
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

const headerTintColors: Partial<Record<string, string>> = {
    '0': '#418db0',
    '1': '#4c4c4c',
    '2': '#fac200',
};

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
    caption?: string;
    onClose?: () => void;

    className?: string;
    tintColor?: string;
    defaultVariant?: string;
}

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
    ({ caption, onClose, className, variant, defaultVariant, tintColor, style, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('header');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['header']?.[resolvedVariant as string];
        const resolvedTint = tintColor || headerTintColors[resolvedVariant as string];
        const overlayClassName = headerOverlayVariants({ variant: resolvedVariant });
        const tintStyle = useTintedVars(headerTintableVars[resolvedVariant as string], resolvedTint);

        return (
            <div
                ref={ref}
                className={cn(headerVariants({ variant: resolvedVariant }), overlayClassName && 'relative', className)}
                style={{ ...style, ...tintStyle }}
                {...props}
            >
                {overlayClassName && <div aria-hidden className={cn('pointer-events-none absolute inset-0', overlayClassName)} />}
                <VariantCascadeProvider map={ownCascade}>
                    <div className="flex items-center justify-center h-full px-2">
                        <span className="flex-1 text-center">{caption}</span>
                        <CloseButton className="shrink-0" onClick={onClose} data-no-drag />
                    </div>
                    {children}
                </VariantCascadeProvider>
            </div>
        );
    }
);

Header.displayName = 'Header';
