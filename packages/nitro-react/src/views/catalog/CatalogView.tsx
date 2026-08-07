import { GetCatalogPageComposer } from "@nitrodevco/nitro-shared";
import { useEffect } from "react";

import { useCatalogActions, useCatalogSelectors, useTranslation, useWebSocketContext } from "#base/context";
import { useSystemActions } from "#base/context/system";
import { Frame, TabButton, TabContent, TabContext } from "#base/theme";

export const CatalogView = () => {
    const { toggleWindow } = useSystemActions();
    const { rootNode, activeNodes, catalogType } = useCatalogSelectors();
    const { activateNode } = useCatalogActions();
    const t = useTranslation();
    const { send } = useWebSocketContext();

    const isPageActive = (pageId: number) => !!activeNodes.find(x => x.pageId === pageId && x.isActive);

    const loadCatalogPage = (pageId: number, offerId: number = -1) => {
        if (pageId < 0) return;

        //busy
        //pageid

        send(new GetCatalogPageComposer({ pageId, offerId, catalogType }));
    }

    useEffect(() => {
        if (!activeNodes.length) return;

        const targetNode = activeNodes[0];

        if (targetNode.pageId > -1) loadCatalogPage(targetNode.pageId)
    }, [activeNodes]);

    if (!rootNode) return null;

    return (
        <Frame id="catalog" variant="3" className="w-142.5 h-150" caption={t('catalog.title')} onClose={() => toggleWindow('catalog')}>
            <TabContext data-name="tabs">
                {rootNode.children.map(x =>
                    x.visible ? <TabButton key={x.pageId} className="w-full" aria-selected={isPageActive(x.pageId)} onClick={_ => activateNode(x)}>{x.localization.length ? x.localization : x.pageName}</TabButton> : null)}
            </TabContext>
            <TabContent>
            </TabContent>
        </Frame>
    );
}