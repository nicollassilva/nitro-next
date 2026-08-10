import { ICatalogNode } from "@nitrodevco/nitro-api"

import { useCatalogNavigation } from "#base/context";

import { CatalogNavigationSetView } from "./CatalogNavigationSetView";

type CatalogNavigationSetItemViewProps = {
    node: ICatalogNode;
    child?: boolean;
}

export const CatalogNavigationSetItemView = (props: CatalogNavigationSetItemViewProps) => {
    const { node, child = false } = props;
    const { activateNode } = useCatalogNavigation();

    return (
        <>
            <div className="flex flex-col justify-center px-0.5 cursor-pointer" style={{ backgroundColor: '#82d1ed' }} onClick={() => activateNode(node)}>
                <span style={{ backgroundColor: '#63c5e9' }}>{node.localization}</span>
            </div>
            {node.isOpen && node.children.length > 0 && <CatalogNavigationSetView node={node} child={true} />}
        </>
    );
}