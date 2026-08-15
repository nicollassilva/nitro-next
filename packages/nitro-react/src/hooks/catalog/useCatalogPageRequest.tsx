import { CatalogPageRequestType, CatalogRequestedPageUtilities } from "@nitrodevco/nitro-api";
import { useEffect } from "react";

import { useCatalogActions, useCatalogSelectors } from "#base/context";

import { useCatalogNavigation } from "./useCatalogNavigation";
import { useCatalogVisibility } from "./useCatalogVisibility";

export const useCatalogPageRequest = () => {
    const { isCatalogVisible } = useCatalogVisibility();
    const { rootNode, activePage, requestedPage } = useCatalogSelectors();
    const { activateNode, openPageById, openPageByName, openPageByOfferId } = useCatalogNavigation();
    const { setRequestedPage } = useCatalogActions();

    useEffect(() => {
        if (!isCatalogVisible || !rootNode || !requestedPage) return;

        switch (requestedPage.type) {
            case CatalogPageRequestType.None: {
                if (activePage) return;

                if (rootNode.children.length > 0) for (const child of rootNode.children) {
                    if (child.visible) {
                        activateNode(child);

                        return;
                    }
                }

                return;
            }
            case CatalogPageRequestType.PageId: {
                if (requestedPage.pageId !== undefined) openPageById(requestedPage.pageId);
                setRequestedPage(CatalogRequestedPageUtilities.getEmpty());
                return;
            }
            case CatalogPageRequestType.PageName: {
                if (requestedPage.pageName !== undefined) openPageByName(requestedPage.pageName);
                setRequestedPage(CatalogRequestedPageUtilities.getEmpty());
                return;
            }
            case CatalogPageRequestType.OfferId: {
                if (requestedPage.offerId !== undefined) openPageByOfferId(requestedPage.offerId);
                setRequestedPage(CatalogRequestedPageUtilities.getEmpty());
                return;
            }
        }
    }, [isCatalogVisible, rootNode, requestedPage]);
}