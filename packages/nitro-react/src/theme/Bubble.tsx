import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, useTintedVars, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const bubbleVariantsConfig = {
    variant: {
        // default
        '0': '[border-image-source:var(--bubble-0-default-src)] [border-image-slice:5_5_6_5_fill] [border-image-width:5px_5px_6px_5px] nine-slice-border min-w-5.25 min-h-5.25 text-[#000000]',
        // default
        '7': 'sprite min-w-6.75 min-h-9.5 bg-(image:--bubble-7-default-src) bg-size-[100%_100%] text-[#000000]',
    },
} as const;

const bubbleOverlayVariantsConfig = {
    variant: {
        // default
        '0': 'bg-(image:--bubble-0-default-spacer-src) bg-position-[right_0px_bottom_0px] bg-size-[1px_1px] bg-no-repeat [image-rendering:pixelated]',
        // default
        '7': '',
    },
} as const;

/** This component's own default tint per variant, from the skin's own `<window color="…">` — a caller-supplied `tintColor` prop always overrides this. */
const bubbleTintColors: Partial<Record<string, string>> = {

};

/** Which CSS vars (bare, no `--`) each variant's own art actually needs recolored — see `#base/useTintedVars`. */
const bubbleTintableVars: Partial<Record<string, string[]>> = {
    '0': ['bubble-0-default-src'],
    '7': ['bubble-7-default-src'],
};

const bubbleVariants = cva('', { variants: bubbleVariantsConfig, defaultVariants: { variant: '0' } });
const bubbleOverlayVariants = cva('', { variants: bubbleOverlayVariantsConfig, defaultVariants: { variant: '0' } });

type BubbleVariantProps = VariantProps<typeof bubbleVariantsConfig>;

interface BubbleProps extends HTMLAttributes<HTMLDivElement>, BubbleVariantProps {
    className?: string;
    /** Recolors this variant's tintable art at runtime — overrides this variant's own default color from the skin, if it has one (see `#base/pixiTint`). */
    tintColor?: string;
    /** Lower-priority fallback than `variant` and any ancestor variant cascade (see `#base/variantCascade`) — e.g. a composite's own window_layout-authored default for this exact instance. Omit to fall back to this component's own generic default. */
    defaultVariant?: string;
}

export const Bubble = forwardRef<HTMLDivElement, BubbleProps>(
    ({ className, variant, defaultVariant, tintColor, style, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('bubble');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['bubble']?.[resolvedVariant];
        const resolvedTint = tintColor || bubbleTintColors[resolvedVariant as string];
        const overlayClassName = bubbleOverlayVariants({ variant: resolvedVariant });
        const tintStyle = useTintedVars(bubbleTintableVars[resolvedVariant as string], resolvedTint);

        return (
            <div
                ref={ref}
                className={cn(bubbleVariants({ variant: resolvedVariant }), overlayClassName && 'relative', className)}
                style={{ ...style, ...tintStyle }}
                {...props}
            >
                {overlayClassName && <div aria-hidden className={cn('pointer-events-none absolute inset-0', overlayClassName)} />}
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

Bubble.displayName = 'Bubble';
