import { IActivePage, ICatalogNode, ICatalogPageLocalization, IPurchasableOffer } from "@nitrodevco/nitro-api";
import { GetCatalogPageComposer } from "@nitrodevco/nitro-shared";

import { useWebSocketContext } from "../communication";
import { useSystemActions } from "../system";
import { useCatalogActions } from "./useCatalogActions";
import { useCatalogSelectors } from "./useCatalogSelectors"

export const useCatalogNavigation = () => {
    const { catalogType, activeNodes } = useCatalogSelectors();
    const { setActiveNodes, setIsBusy, setActivePageId, setActivePage, setActiveOffer } = useCatalogActions();
    const { hideWindow } = useSystemActions();
    const { send } = useWebSocketContext();

    const isNodeActive = (node: ICatalogNode) => activeNodes.indexOf(node) >= 0;

    const loadCatalogPage = (pageId: number, offerId: number) => {
        if (pageId < 0) return;

        setIsBusy(true);
        setActivePageId(pageId);

        send(new GetCatalogPageComposer({ pageId, offerId, catalogType }));
    }

    const showCatalogPage = (pageId: number, layoutCode: string, localization: ICatalogPageLocalization, offers: IPurchasableOffer[], offerId: number, acceptSeasonCurrencyAsCredits: boolean, mode: number = -1) => {
        const page = {
            pageId,
            layoutCode,
            localization,
            offers,
            acceptSeasonCurrencyAsCredits,
            mode: mode === -1 ? 0 : mode
        } as IActivePage;

        for (const offer of page.offers) offer.page = page;

        setActivePage(page);

        if (offerId > -1 && page.offers.length) {
            for (const offer of page.offers) {
                if (offer.offerId !== offerId) continue;

                setActiveOffer(offer);

                break;
            }
        }
    }

    const activateNode = (targetNode: ICatalogNode, offerId: number = -1) => {
        if (targetNode.parent?.pageName && targetNode.parent.pageName === 'root') {
            for (const child of targetNode.children) {
                if (!child.visible) continue;

                targetNode = child;

                break;
            }
        }

        const nodes: ICatalogNode[] = [];

        let node: ICatalogNode | undefined = targetNode;

        while (node && (node.pageName !== 'root')) {
            nodes.push(node);

            node = node.parent;
        }

        nodes.reverse();

        const prevNodes = [...activeNodes];
        const isActive = prevNodes.indexOf(targetNode) >= 0;
        const isOpen = targetNode.isOpen;

        for (const n of prevNodes) {
            n.isActive = false;

            if (nodes.indexOf(n) === -1) n.isOpen = false;
        }

        for (const n of nodes) {
            n.isActive = true;

            if (n.parent) n.isOpen = true;

            if (n === targetNode.parent && n.children.length) n.isOpen = true;
        }

        if (isActive && isOpen) targetNode.isOpen = false;
        else targetNode.isOpen = true;

        setActiveNodes(nodes);

        if (targetNode.pageId > -1) loadCatalogPage(targetNode.pageId, offerId);
    }

    const selectOffer = (offer: IPurchasableOffer) => {
        if (offer.isLazy) return;

        setActiveOffer(offer);
    }

    const hideCatalog = () => {
        hideWindow('catalog');
    }

    return { isNodeActive, loadCatalogPage, showCatalogPage, activateNode, selectOffer, hideCatalog };
}