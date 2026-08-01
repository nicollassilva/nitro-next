import { forwardRef, type HTMLAttributes, useCallback } from 'react';

import { useFrameDrag } from '#base/hooks/logic/useFrameDrag';
import { cn, cva, type VariantProps } from '#base/utils';
import { useTintedVars } from '#base/utils';

import { ContentArea } from './ContentArea';
import { Header } from './Header';
import { Scaler } from './Scaler';

const frameVariantsConfig = {
    variant: {
        // blue
        '0': '[border-image-source:var(--frame-0-default-src)] [border-image-slice:13_13_13_13_fill] [border-image-width:13px_13px_13px_13px] [border-image-repeat:stretch] [image-rendering:pixelated] min-w-10 min-h-10 text-[#000000]',
        // black
        '1': '[border-image-source:var(--frame-0-default-src)] [border-image-slice:13_13_13_13_fill] [border-image-width:13px_13px_13px_13px] [border-image-repeat:stretch] [image-rendering:pixelated] min-w-10 min-h-10 text-[#000000]',
        // yellow
        '2': '[border-image-source:var(--frame-0-default-src)] [border-image-slice:13_13_13_13_fill] [border-image-width:13px_13px_13px_13px] [border-image-repeat:stretch] [image-rendering:pixelated] min-w-10 min-h-10 text-[#000000]',
        // default
        '3': '[border-image-source:var(--frame-3-default-src)] [border-image-slice:33_10_10_10_fill] [border-image-width:33px_10px_10px_10px] [border-image-repeat:stretch] [image-rendering:pixelated] min-w-16 min-h-16 text-[#000000]',
        // light
        '4': '[border-image-source:var(--frame-3-default-src)] [border-image-slice:33_10_10_10_fill] [border-image-width:33px_10px_10px_10px] [border-image-repeat:stretch] [image-rendering:pixelated] min-w-16 min-h-16 text-[#000000]',
        // bubble
        '7': '[border-image-source:var(--frame-3-default-src)] [border-image-slice:33_10_10_10_fill] [border-image-width:33px_10px_10px_10px] [border-image-repeat:stretch] [image-rendering:pixelated] min-w-16 min-h-18.25 text-[#000000]',
        // default
        '100': 'inline-block min-w-2.75 min-h-3.25 [background-image:var(--border-101-default-src)] bg-size-[100%_100%] bg-no-repeat [image-rendering:pixelated] text-[#000000] text-style-il-frame-title',
        // modal
        '101': 'min-w-12.5 min-h-20 text-[#000000] text-style-il-frame-modal-title',
        // default
        '200': '[border-image-source:var(--frame-200-default-src)] [border-image-slice:4_4_5_4_fill] [border-image-width:4px_4px_5px_4px] [border-image-repeat:stretch] [image-rendering:pixelated] min-w-12.5 min-h-12.5 text-[#000000] text-style-id-frame-title',
    },
} as const;

const frameOverlayVariantsConfig = {
    variant: {
        // blue
        '0': '[background-image:var(--frame-0-default-shine-top-left-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-top-right-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-bottom-left-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-bottom-right-src)] [background-position:left_1px_top_1px,_left_8px_top_2px,_right_1px_top_1px,_left_2px_top_8px,_right_2px_top_8px,_left_1px_bottom_1px,_left_8px_bottom_2px,_right_1px_bottom_1px] [background-size:7px_7px,_calc(100%_-_8px_-_8px)_1px,_7px_7px,_1px_calc(100%_-_8px_-_8px),_1px_calc(100%_-_8px_-_7px),_7px_7px,_calc(100%_-_8px_-_7px)_1px,_6px_6px] [background-repeat:no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat] [image-rendering:pixelated]',
        // black
        '1': '[background-image:var(--frame-0-default-shine-top-left-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-top-right-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-bottom-left-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-bottom-right-src)] [background-position:left_1px_top_1px,_left_8px_top_2px,_right_1px_top_1px,_left_2px_top_8px,_right_2px_top_8px,_left_1px_bottom_1px,_left_8px_bottom_2px,_right_1px_bottom_1px] [background-size:7px_7px,_calc(100%_-_8px_-_8px)_1px,_7px_7px,_1px_calc(100%_-_8px_-_8px),_1px_calc(100%_-_8px_-_7px),_7px_7px,_calc(100%_-_8px_-_7px)_1px,_6px_6px] [background-repeat:no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat] [image-rendering:pixelated]',
        // yellow
        '2': '[background-image:var(--frame-0-default-shine-top-left-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-top-right-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-bottom-left-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-bottom-right-src)] [background-position:left_1px_top_1px,_left_8px_top_2px,_right_1px_top_1px,_left_2px_top_8px,_right_2px_top_8px,_left_1px_bottom_1px,_left_8px_bottom_2px,_right_1px_bottom_1px] [background-size:7px_7px,_calc(100%_-_8px_-_8px)_1px,_7px_7px,_1px_calc(100%_-_8px_-_8px),_1px_calc(100%_-_8px_-_7px),_7px_7px,_calc(100%_-_8px_-_7px)_1px,_6px_6px] [background-repeat:no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat,_no-repeat_no-repeat] [image-rendering:pixelated]',
        // default
        '3': '[border-image-source:var(--frame-3-default-shine-src)] [border-image-slice:33_10_10_10_fill] [border-image-width:33px_10px_10px_10px] [border-image-repeat:stretch] [image-rendering:pixelated]',
        // light
        '4': '[border-image-source:var(--frame-3-default-shine-src)] [border-image-slice:33_10_10_10_fill] [border-image-width:33px_10px_10px_10px] [border-image-repeat:stretch] [image-rendering:pixelated]',
        // bubble
        '7': '[border-image-source:var(--frame-3-default-shine-src)] [border-image-slice:33_10_10_10_fill] [border-image-width:33px_10px_10px_10px] [border-image-repeat:stretch] [image-rendering:pixelated]',
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
    /** Stable identifier used to persist the dragged position across open/close and to track this frame's z-index. Frames without one still drag and stack, but won't remember their position after unmounting. */
    id?: string;
}

export const Frame = forwardRef<HTMLDivElement, FrameProps>(
    ({ caption, className, variant, tintColor, onClose, id, style, children, ...props }, ref) => {
        const resolvedVariant = variant ?? '0';
        const resolvedTint = tintColor || frameTintColors[resolvedVariant];
        const overlayClassName = frameOverlayVariants({ variant });
        const tintStyle = useTintedVars(frameTintableVars[resolvedVariant], resolvedTint);
        const { frameRef, style: dragStyle, onPointerDown, onHeaderPointerDown } = useFrameDrag(id);

        const setRefs = useCallback((node: HTMLDivElement | null) => {
            frameRef.current = node;

            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
        }, [ref, frameRef]);

        return (
            <div
                ref={setRefs}
                id={id}
                className={cn(frameVariants({ variant }), overlayClassName && 'relative', className)}
                style={{ ...style, ...tintStyle, ...dragStyle }}
                onPointerDown={onPointerDown}
                {...props}
            >
                {overlayClassName && <div aria-hidden className={cn('pointer-events-none absolute inset-0', overlayClassName)} />}
                <Header variant={variant as undefined} caption={caption} onClose={onClose} onPointerDown={onHeaderPointerDown} className="cursor-grab active:cursor-grabbing" />
                <ContentArea>
                    {children}
                    <Scaler variant={variant as undefined} />
                </ContentArea>
            </div>
        );
    }
);

Frame.displayName = 'Frame';
