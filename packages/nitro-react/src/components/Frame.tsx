import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, type VariantProps } from '#base/utils';
import { useTintedVars } from '#base/utils';

import { ContentArea } from './ContentArea';
import { Header } from './Header';
import { Scaler } from './Scaler';

const frameVariantsConfig = {
    variant: {
        // blue
        '0': '[border-image-source:var(--frame-0-default-src)] [border-image-slice:13_13_13_13_fill] [border-image-width:13px_13px_13px_13px] [border-image-repeat:stretch] min-w-10 min-h-10 text-[#000000]',
        // black
        '1': '[border-image-source:var(--frame-0-default-src)] [border-image-slice:13_13_13_13_fill] [border-image-width:13px_13px_13px_13px] [border-image-repeat:stretch] min-w-10 min-h-10 text-[#000000]',
        // yellow
        '2': '[border-image-source:var(--frame-0-default-src)] [border-image-slice:13_13_13_13_fill] [border-image-width:13px_13px_13px_13px] [border-image-repeat:stretch] min-w-10 min-h-10 text-[#000000]',
        // default
        '3': '[border-image-source:var(--frame-3-default-src)] [border-image-slice:33_10_10_10_fill] [border-image-width:33px_10px_10px_10px] [border-image-repeat:stretch] min-w-16 min-h-16 text-[#000000]',
        // light
        '4': '[border-image-source:var(--frame-3-default-src)] [border-image-slice:33_10_10_10_fill] [border-image-width:33px_10px_10px_10px] [border-image-repeat:stretch] min-w-16 min-h-16 text-[#000000]',
        // bubble
        '7': '[border-image-source:var(--frame-3-default-src)] [border-image-slice:33_10_10_10_fill] [border-image-width:33px_10px_10px_10px] [border-image-repeat:stretch] min-w-16 min-h-18.25 text-[#000000]',
        // default
        '100': 'inline-block min-w-2.75 min-h-3.25 [background-image:var(--border-101-default-src)] bg-size-[100%_100%] bg-no-repeat text-[#000000] text-style-il-frame-title',
        // modal
        '101': 'min-w-12.5 min-h-20 text-[#000000] text-style-il-frame-modal-title',
        // default
        '200': '[border-image-source:var(--frame-200-default-src)] [border-image-slice:4_4_5_4_fill] [border-image-width:4px_4px_5px_4px] [border-image-repeat:stretch] min-w-12.5 min-h-12.5 text-[#000000] text-style-id-frame-title',
    },
} as const;

const frameOverlayVariantsConfig = {
    variant: {
        // blue
        '0': '[background-image:var(--frame-0-default-shine-src)] bg-size-[100%_100%] bg-no-repeat',
        // black
        '1': '[background-image:var(--frame-0-default-shine-src)] bg-size-[100%_100%] bg-no-repeat',
        // yellow
        '2': '[background-image:var(--frame-0-default-shine-src)] bg-size-[100%_100%] bg-no-repeat',
        // default
        '3': '[border-image-source:var(--frame-3-default-shine-src)] [border-image-slice:33_10_10_10_fill] [border-image-width:33px_10px_10px_10px] [border-image-repeat:stretch]',
        // light
        '4': '[border-image-source:var(--frame-3-default-shine-src)] [border-image-slice:33_10_10_10_fill] [border-image-width:33px_10px_10px_10px] [border-image-repeat:stretch]',
        // bubble
        '7': '[border-image-source:var(--frame-3-default-shine-src)] [border-image-slice:33_10_10_10_fill] [border-image-width:33px_10px_10px_10px] [border-image-repeat:stretch]',
        // default
        '100': '',
        // modal
        '101': '',
        // default
        '200': '',
    },
} as const;

/** This component's own default tint per variant, from the skin's own `<window color="…">` — a caller-supplied `tintColor` prop always overrides this. */
const frameTintColors: Partial<Record<string, string>> = {
    '0': '#418db0',
    '1': '#4c4c4c',
    '2': '#fac200',
    '3': '#418db0',
    '4': '#67a3bf',
};

/** Which CSS vars (bare, no `--`) each variant's own art actually needs recolored — see `#base/useTintedVars`. */
const frameTintableVars: Partial<Record<string, string[]>> = {
    '0': ['frame-0-default-src'],
    '1': ['frame-0-default-src'],
    '2': ['frame-0-default-src'],
    '3': ['frame-3-default-src'],
    '4': ['frame-3-default-src'],
    '7': ['frame-3-default-src'],
};

const frameVariants = cva('absolute flex flex-col min-w-10 min-h-10 pointer-events-auto overflow-hidden', { variants: frameVariantsConfig, defaultVariants: { variant: '0' } });
const frameOverlayVariants = cva('', { variants: frameOverlayVariantsConfig, defaultVariants: { variant: '0' } });

type FrameVariantProps = VariantProps<typeof frameVariantsConfig>;

interface FrameProps extends HTMLAttributes<HTMLDivElement>, FrameVariantProps {
    caption: string;
    className?: string;
    tintColor?: string;
    onClose?: () => void;
}

export const Frame = forwardRef<HTMLDivElement, FrameProps>(
    ({ caption, className, variant, tintColor, onClose, style, children, ...props }, ref) => {
        const resolvedVariant = variant ?? '0';
        const resolvedTint = tintColor || frameTintColors[resolvedVariant];
        const overlayClassName = frameOverlayVariants({ variant });
        const tintStyle = useTintedVars(frameTintableVars[resolvedVariant], resolvedTint);

        return (
            <div
                ref={ref}
                className={cn(frameVariants({ variant }), overlayClassName && 'relative', className)}
                style={{ ...style, ...tintStyle }}
                {...props}
            >
                {overlayClassName && <div aria-hidden className={cn('pointer-events-none absolute inset-0', overlayClassName)} />}
                <Header variant={variant as undefined} caption={caption} onClose={onClose} />
                <ContentArea>
                    {children}
                    <Scaler variant={variant as undefined} />
                </ContentArea>
            </div>
        );
    }
);

Frame.displayName = 'Frame';
