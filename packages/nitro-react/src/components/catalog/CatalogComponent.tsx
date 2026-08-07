import { BuildersClubQueryFurniCountComposer, CatalogIndexMessage, CatalogPageMessage, GetCatalogIndexComposer, GetClubGiftInfoComposer, GetGiftWrappingConfigurationComposer, ICatalogNode } from "@nitrodevco/nitro-shared";
import { useEffect } from "react";

import { useCatalogActions, useCatalogSelectors, useIsWindowVisible, useWebSocketContext } from "#base/context";
import { useMessageListener } from "#base/hooks";
import { CatalogView } from "#base/views/catalog/CatalogView";

export const CatalogComponent = () => {
    const isVisible = useIsWindowVisible('catalog');
    const { catalogType, rootNode, activePageId } = useCatalogSelectors();
    const { setRootNode, setOffersToNodes } = useCatalogActions();
    const { send } = useWebSocketContext();

    useMessageListener(CatalogPageMessage, data => {
        const page = data.page;

        if (!page || page.catalogType !== catalogType || page.pageId !== activePageId) return;

        console.log(page);
    });

    useMessageListener(CatalogIndexMessage, data => {
        if (data.catalogType !== catalogType) return;

        const offers: Record<number, ICatalogNode[]> = {};

        const getNode = (node: ICatalogNode, depth: number, parent: ICatalogNode | undefined) => {
            node.depth = depth;
            node.parent = parent;

            for (const offerId of node.offerIds) {
                if (offers[offerId] !== undefined) offers[offerId].push(node);
                else offers[offerId] = [node];
            }

            depth++;

            for (const child of node.children) getNode(child, depth, node);

            return node;
        };

        setRootNode(getNode(data.root, 0, undefined));
        setOffersToNodes(offers);
    });

    useEffect(() => {
        if (!isVisible || rootNode) return;

        send(new GetGiftWrappingConfigurationComposer({}), new GetClubGiftInfoComposer({}), new GetCatalogIndexComposer({ catalogType }), new BuildersClubQueryFurniCountComposer({}));
    }, [isVisible, rootNode, catalogType]);

    if (!isVisible) return null;

    return <CatalogView />;
}
