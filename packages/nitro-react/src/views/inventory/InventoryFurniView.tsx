import { useCallback, useState } from "react";

import { useLocalizationStore } from "#base/stores";
import { Border, Button, Dropmenu, ScrollableItemGridVertical, ScrollArea } from "#base/theme";

const PAGE_SIZE = 24;
const MAX_ITEMS = 200;

export const InventoryFurniView = (props: { scrollVariant: string }) => {
    const [itemCount, setItemCount] = useState(PAGE_SIZE);
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    const loadMore = useCallback(() => {
        setItemCount((count) => Math.min(count + PAGE_SIZE, MAX_ITEMS));
    }, []);

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
                <ScrollArea variant={props.scrollVariant} className="" reachThreshold={40} onReachEnd={loadMore}>
                    <div className="grid grid-cols-4 gap-1 p-1">
                        {Array.from({ length: itemCount }, (_, index) => (
                            <ScrollableItemGridVertical key={index} variant="3" />
                        ))}
                    </div>
                </ScrollArea>
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