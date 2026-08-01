import { useCallback, useState } from "react";

import { Border, Button, ScrollableItemGridVertical, ScrollArea } from "#base/components";
import { Dropmenu } from "#base/components/Dropmenu";
import { useLocalizationStore } from "#base/stores";

const PAGE_SIZE = 24;
const MAX_ITEMS = 200;

export const InventoryFurniView = () => {
    const [itemCount, setItemCount] = useState(PAGE_SIZE);
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    const loadMore = useCallback(() => {
        setItemCount((count) => Math.min(count + PAGE_SIZE, MAX_ITEMS));
    }, []);

    return (
        <div className="flex flex-col gap-1 h-full">
            <Border variant="3" tintColor="#CACACA" className="flex gap-1.5 p-1">
                <Border variant="0">
                    <input type="text"></input>
                </Border>
                <Dropmenu variant="100" />
                <Dropmenu variant="100" />
            </Border>
            <div className="flex h-full gap-1 overflow-hidden">
                <ScrollArea variant="0" className="flex-8" reachThreshold={40} onReachEnd={loadMore}>
                    <div className="grid grid-cols-4 gap-1 p-1">
                        {Array.from({ length: itemCount }, (_, index) => (
                            <ScrollableItemGridVertical key={index} variant="3" />
                        ))}
                    </div>
                </ScrollArea>
                <div className="flex flex-col flex-4">
                    <div className="flex-1">preview</div>
                    <div className="flex">
                        <Button variant="3">{getLocalizationValue('inventory.furni.placetoroom')}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}