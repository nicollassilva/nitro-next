
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

import { useCatalogSelectors } from "#base/context"
import { Border, ScrollbarVertical } from "#base/theme"

import { CatalogItemGridWidgetItemView } from "./CatalogItemGridWidgetItemView";

const PAGE_SIZE = 24;
const MAX_ITEMS = 200;
const COLUMNS = 6;
const ROW_GAP = 4;

export const CatalogItemGridWidgetView = () => {
    const { activePage } = useCatalogSelectors();
    const viewportRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const itemCount = activePage?.offers.length ?? 0;
    const rowCount = Math.ceil(itemCount / COLUMNS);

    const rowVirtualizer = useVirtualizer({
        count: rowCount,
        getScrollElement: () => viewportRef.current,
        estimateSize: () => 60,
        gap: ROW_GAP,
        overscan: 4,
    });

    const virtualRows = rowVirtualizer.getVirtualItems();

    if (!activePage) return null;

    return (
        <Border variant="6" className="size-full">
            <div className="flex size-full min-h-0 min-w-0 gap-0.5 p-1 overflow-hidden">
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
                                    className="absolute top-0 left-0 w-full gap-1 flex"
                                    style={{ height: virtualRow.size, transform: `translateY(${virtualRow.start}px)` }}
                                >
                                    {Array.from({ length: rowItemCount }, (_, i) => (
                                        <CatalogItemGridWidgetItemView key={rowStart + i} offer={activePage?.offers[rowStart + i]} />
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <ScrollbarVertical
                    viewportRef={viewportRef}
                    contentRef={contentRef}
                    variant="3"
                />
            </div>
        </Border>
    )
}