import { ICatalogNode } from "@nitrodevco/nitro-api"

import { CatalogNavigationSetItemView } from "./CatalogNavigationSetItemView";

type CatalogNavigationSetViewProps = {
    node: ICatalogNode;
    child?: boolean;
}

export const CatalogNavigationSetView = (props: CatalogNavigationSetViewProps) => {
    const { node, child = false } = props;

    if (!node.children.length) return null;

    return (
        <div className="flex flex-col gap-0.5">
            {node.children.map(x => {
                return x.visible ? <CatalogNavigationSetItemView key={x.pageId} node={x} child={child} /> : null;
            })}
        </div>
    )
}