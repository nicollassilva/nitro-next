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
        <Border variant="6" className="overflow-hidden">
            <ScrollArea variant="3" className="flex-1 min-h-0 p-0.5 gap-1 text-[0.68rem]" contentClassName="flex flex-col">
                <CatalogNavigationSetView node={node} />
            </ScrollArea>
        </Border>
    )
}