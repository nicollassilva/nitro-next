import { forwardRef, type HTMLAttributes, useRef } from 'react';

import { ScrollbarHorizontal } from './ScrollbarHorizontal';
import { ScrollbarVertical } from './ScrollbarVertical';
import { cn } from './utils';

type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both';

interface ScrollAreaProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onScroll'> {
    className?: string;
    orientation?: ScrollAreaOrientation;
    variant?: string;
    defaultVariant?: string;
    viewportClassName?: string;
    contentClassName?: string;
    tintColor?: string;
    step?: number;
    minThumbSize?: number;
    reachThreshold?: number;
    onReachStart?: () => void;
    onReachEnd?: () => void;
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
    ({
        className,
        orientation = 'vertical',
        variant,
        defaultVariant,
        viewportClassName,
        contentClassName,
        tintColor,
        step,
        minThumbSize,
        reachThreshold,
        onReachStart,
        onReachEnd,
        children,
        ...props
    }, ref) => {
        const viewportRef = useRef<HTMLDivElement>(null);
        const contentRef = useRef<HTMLDivElement>(null);

        const showVertical = orientation === 'vertical' || orientation === 'both';
        const showHorizontal = orientation === 'horizontal' || orientation === 'both';

        return (
            <div ref={ref} className={cn('flex size-full min-h-0 min-w-0 gap-0.5', className)} {...props}>
                <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-0.5">
                    <div
                        ref={viewportRef}
                        className={cn(
                            'min-h-0 min-w-0 flex-1',
                            showVertical && 'overflow-y-auto',
                            showHorizontal && 'overflow-x-auto',
                            'scrollbar-none [&::-webkit-scrollbar]:hidden',
                            viewportClassName
                        )}
                    >
                        <div ref={contentRef} className={contentClassName}>
                            {children}
                        </div>
                    </div>
                    {showHorizontal && (
                        <ScrollbarHorizontal
                            viewportRef={viewportRef}
                            contentRef={contentRef}
                            variant={variant}
                            defaultVariant={defaultVariant}
                            tintColor={tintColor}
                            step={step}
                            minThumbSize={minThumbSize}
                            reachThreshold={orientation === 'both' ? undefined : reachThreshold}
                            onReachStart={orientation === 'both' ? undefined : onReachStart}
                            onReachEnd={orientation === 'both' ? undefined : onReachEnd}
                        />
                    )}
                </div>
                {showVertical && (
                    <ScrollbarVertical
                        viewportRef={viewportRef}
                        contentRef={contentRef}
                        variant={variant}
                        defaultVariant={defaultVariant}
                        tintColor={tintColor}
                        step={step}
                        minThumbSize={minThumbSize}
                        reachThreshold={reachThreshold}
                        onReachStart={onReachStart}
                        onReachEnd={onReachEnd}
                    />
                )}
            </div>
        );
    }
);

ScrollArea.displayName = 'ScrollArea';
