import { useVirtualizer } from '@tanstack/react-virtual';
import { Fragment, Key, ReactElement, useEffect, useRef, useState } from 'react';

import { ScrollbarVertical } from './ScrollbarVertical';

export const InfiniteGrid = <T,>(props: {
    items: T[];
    itemWidth?: number;
    minHeight?: number;
    overrideColumnCount?: number;
    itemRender: (item: T, index?: number) => ReactElement;
    getKey: (item: T) => Key;
}) => {
    const { items = [], itemWidth = 45, minHeight = 45, overrideColumnCount = 0, itemRender, getKey } = props;
    const [columnCount, setColumnCount] = useState(0);
    const elementRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const virtualizer = useVirtualizer({
        count: (Math.ceil((items.length / (columnCount || 1))) || 1),
        overscan: 1,
        getScrollElement: () => elementRef.current,
        estimateSize: () => minHeight,
    });

    useEffect(() => {
        if (!elementRef?.current) return;

        let previousWidth = -1;
        let debounceTimeout: ReturnType<typeof setTimeout> | undefined = undefined;

        const setColumnsForWidth = (width: number, force: boolean = false) => {
            width = Math.floor(width);

            if (width === previousWidth) return;

            previousWidth = width;

            if (debounceTimeout) clearTimeout(debounceTimeout);

            if (force) {
                setColumnCount(overrideColumnCount || Math.max(1, Math.min(12, Math.ceil(previousWidth / (itemWidth + 4)))));

                return;
            }

            debounceTimeout = setTimeout(() => {
                setColumnCount(overrideColumnCount || Math.max(1, Math.min(12, Math.ceil(previousWidth / (itemWidth + 4)))));
            }, 10);
        };

        const resizeObserver = new ResizeObserver(entries => {
            const entry = entries?.[0];

            if (entry) setColumnsForWidth(entry.contentRect.width);
        });

        resizeObserver.observe(elementRef.current);

        const initialSize = elementRef.current.getBoundingClientRect();

        if (initialSize) setColumnsForWidth(initialSize.width, true);

        return () => {
            if (debounceTimeout) clearTimeout(debounceTimeout);

            resizeObserver.disconnect();
        };
    }, [itemWidth, overrideColumnCount]);

    return (
        <div className="flex size-full min-h-0 min-w-0 gap-0.5 p-1 overflow-hidden">
            <div
                ref={elementRef}
                className="min-h-0 min-w-0 flex-1 overflow-y-auto pr-1.5 py-0.5 scrollbar-none [&::-webkit-scrollbar]:hidden">
                <div
                    ref={contentRef}
                    className="flex flex-col w-full *:pb-1 *:last:pb-0 relative"
                    style={{
                        height: `${virtualizer.getTotalSize()}px`
                    }}>
                    {virtualizer.getVirtualItems().map(virtualRow => (
                        <div
                            key={virtualRow.key}
                            data-index={virtualRow.index}
                            ref={virtualizer.measureElement}
                            className={`grid grid-cols-${columnCount} gap-1 absolute top-0 left-0 w-full`}
                            style={{
                                minHeight: `${minHeight}px`,
                                transform: `translateY(${virtualRow.start}px)`
                            }}>
                            {Array.from(Array(columnCount)).map((e, i) => {
                                const item = items[i + (virtualRow.index * columnCount)];

                                if (!item) return null;

                                return (
                                    <Fragment key={getKey(item)}>
                                        {(item && itemRender(item, i)) ?? null}
                                    </Fragment>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            <ScrollbarVertical
                viewportRef={elementRef}
                contentRef={contentRef}
                variant="3"
            />
        </div>
    );
};
