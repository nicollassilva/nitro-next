import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useRef, useState } from "react";

import { useLocalizationStore } from "#base/stores";
import { Border, Button, Dropmenu, ScrollableItemGridVertical, ScrollbarVertical } from "#base/theme";

const PAGE_SIZE = 24;
const MAX_ITEMS = 200;
const COLUMNS = 4;
const ROW_SIZE = 40;
const ROW_GAP = 4;

export const InventoryFurniView = (props: { scrollVariant: string }) => {
    const [itemCount, setItemCount] = useState(PAGE_SIZE);
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    const viewportRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const loadMore = useCallback(() => {
        setItemCount((count) => Math.min(count + PAGE_SIZE, MAX_ITEMS));
    }, []);

    const rowCount = Math.ceil(itemCount / COLUMNS);

    const rowVirtualizer = useVirtualizer({
        count: rowCount,
        getScrollElement: () => viewportRef.current,
        estimateSize: () => ROW_SIZE,
        gap: ROW_GAP,
        overscan: 4,
    });

    const virtualRows = rowVirtualizer.getVirtualItems();

    useEffect(() => {
        const lastRow = virtualRows[virtualRows.length - 1];
        if (!lastRow) return;
        if (lastRow.index >= rowCount - 1 && itemCount < MAX_ITEMS) loadMore();
    }, [virtualRows, rowCount, itemCount, loadMore]);

    //tintColor="#CACACA"

    return (
        <div className="flex flex-col gap-1 h-full">
            <Border variant="3" tintColor="#cacaca" className="flex gap-1.5 p-1 h-6.25 items-center">
                <Border variant="0" className="w-34.75 h-5">
                    <input type="text w-full overflow-hidden"></input>
                </Border>
                <Dropmenu variant="100" className="w-29.75 h-5.25" />
                <Dropmenu variant="100" className="w-29.75 h-5.25" />
            </Border>
            <div className="flex h-full gap-1 overflow-hidden">
                <div className="flex size-full min-h-0 min-w-0 gap-0.5">
                    <div
                        ref={viewportRef}
                        className="min-h-0 min-w-0 flex-1 overflow-y-auto p-1 scrollbar-none [&::-webkit-scrollbar]:hidden"
                    >
                        <div ref={contentRef} className="relative w-full" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
                            {virtualRows.map((virtualRow) => {
                                const rowStart = virtualRow.index * COLUMNS;
                                const rowItemCount = Math.min(COLUMNS, itemCount - rowStart);

                                return (
                                    <div
                                        key={virtualRow.key}
                                        className="absolute top-0 left-0 grid w-full grid-cols-4 gap-1"
                                        style={{ height: virtualRow.size, transform: `translateY(${virtualRow.start}px)` }}
                                    >
                                        {Array.from({ length: rowItemCount }, (_, i) => (
                                            <ScrollableItemGridVertical key={rowStart + i} variant="3" />
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <ScrollbarVertical
                        viewportRef={viewportRef}
                        contentRef={contentRef}
                        variant={props.scrollVariant}
                    />
                </div>
                <div className="flex flex-col w-45 shrink-0">
                    <div className="flex-1">preview</div>
                    <div className="flex">
                        <Button variant="102">{getLocalizationValue('inventory.furni.placetoroom')}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
