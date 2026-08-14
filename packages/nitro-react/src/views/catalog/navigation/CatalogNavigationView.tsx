import { ICatalogNode } from "@nitrodevco/nitro-api";

import { Border, ScrollArea } from "#base/theme";

import { CatalogNavigationSetView } from "./CatalogNavigationSetView";

type CatalogNavigationViewProps = {
    node: ICatalogNode;
}

export const CatalogNavigationView = (props: CatalogNavigationViewProps) => {
    const { node } = props;

    if (!node) return null;


    return (
        <Border variant="6" className="overflow-hidden px-1 py-1.25" blend={0.5}>
            <ScrollArea variant="3" className="flex-1 min-h-0 text-[0.68rem] gap-0!" contentClassName="flex flex-col">
                <CatalogNavigationSetView node={node} />
            </ScrollArea>
        </Border>
    )
}