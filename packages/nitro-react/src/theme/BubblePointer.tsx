import { forwardRef, type HTMLAttributes } from 'react';

import { cn, cva, useCascadedVariant, useTintedVars, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

type Direction = 'left' | 'right' | 'up' | 'down';

const directionConfig = {
    left: {
        cascadeKey: 'bubblePointerLeft',
        base: '-mr-0.5',
        variants: {
            variant: {
                // default
                '0': 'sprite min-w-2 min-h-3.25 bg-(image:--bubblepointerleft-src) bg-position-[-11px_-0px] bg-size-[19px_18px]',
                // ubuntu
                '7': 'sprite min-w-2.75 min-h-4.5 bg-(image:--bubblepointerleft-src) bg-position-[-0px_-0px] bg-size-[19px_18px]',
            },
        },
        tintColors: {},
        tintableVars: {
            '0': ['bubblepointerleft-src'],
            '7': ['bubblepointerleft-src'],
        },
    },
    right: {
        cascadeKey: 'bubblePointerRight',
        base: '-ml-0.5',
        variants: {
            variant: {
                // default
                '0': 'sprite min-w-2 min-h-3.25 bg-(image:--bubblepointerright-src) bg-position-[-11px_-0px] bg-size-[19px_18px]',
                // ubuntu
                '7': 'sprite min-w-2.75 min-h-4.5 bg-(image:--bubblepointerright-src) bg-position-[-0px_-0px] bg-size-[19px_18px]',
            },
        },
        tintColors: {},
        tintableVars: {
            '0': ['bubblepointerright-src'],
            '7': ['bubblepointerright-src'],
        },
    },
    up: {
        cascadeKey: 'bubblePointerUp',
        base: '-mb-0.75',
        variants: {
            variant: {
                // default
                '0': 'sprite min-w-3.25 min-h-2.25 bg-(image:--bubblepointerup-src) bg-position-[-16px_-0px] bg-size-[29px_10px]',
                // ubuntu
                '7': 'sprite min-w-4 min-h-2.5 bg-(image:--bubblepointerup-src) bg-position-[-0px_-0px] bg-size-[29px_10px]',
            },
        },
        tintColors: {},
        tintableVars: {
            '0': ['bubblepointerup-src'],
            '7': ['bubblepointerup-src'],
        },
    },
    down: {
        cascadeKey: 'bubblePointerDown',
        base: '-mt-0.75',
        variants: {
            variant: {
                // default
                '0': 'sprite min-w-3.25 min-h-2.25 bg-(image:--bubblepointerdown-src) bg-position-[-16px_-0px] bg-size-[29px_11px]',
                // ubuntu
                '7': 'sprite min-w-4 min-h-2.75 bg-(image:--bubblepointerdown-src) bg-position-[-0px_-0px] bg-size-[29px_11px]',
            },
        },
        tintColors: {},
        tintableVars: {
            '0': ['bubblepointerdown-src'],
            '7': ['bubblepointerdown-src'],
        },
    },
} as const satisfies Record<Direction, {
    cascadeKey: string;
    base: string;
    variants: { variant: Record<string, string> };
    tintColors: Partial<Record<string, string>>;
    tintableVars: Partial<Record<string, string[]>>;
}>;

const directionVariants = {
    left: cva(directionConfig.left.base, { variants: directionConfig.left.variants, defaultVariants: { variant: '0' } }),
    right: cva(directionConfig.right.base, { variants: directionConfig.right.variants, defaultVariants: { variant: '0' } }),
    up: cva(directionConfig.up.base, { variants: directionConfig.up.variants, defaultVariants: { variant: '0' } }),
    down: cva(directionConfig.down.base, { variants: directionConfig.down.variants, defaultVariants: { variant: '0' } }),
} as const;

type BubblePointerVariantProps = VariantProps<typeof directionConfig.down.variants>;

interface BubblePointerProps extends HTMLAttributes<HTMLDivElement>, BubblePointerVariantProps {
    direction: Direction;
    className?: string;
    tintColor?: string;
    defaultVariant?: string;
}

export const BubblePointer = forwardRef<HTMLDivElement, BubblePointerProps>(
    ({ direction, className, variant, defaultVariant, tintColor, style, children, ...props }, ref) => {
        const config = directionConfig[direction];
        const cascadeKey = config.cascadeKey ?? 'bubblePointer';
        const cascadedVariant = useCascadedVariant(cascadeKey);
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG[cascadeKey]?.[resolvedVariant];
        const resolvedTint = tintColor || config.tintColors[resolvedVariant as string];
        const tintStyle = useTintedVars(config.tintableVars[resolvedVariant as string], resolvedTint);

        return (
            <div
                ref={ref}
                className={cn(directionVariants[direction]({ variant: resolvedVariant }), className)}
                style={{ ...style, ...tintStyle }}
                {...props}
            >
                <VariantCascadeProvider map={ownCascade}>{children}</VariantCascadeProvider>
            </div>
        );
    }
);

BubblePointer.displayName = 'BubblePointer';