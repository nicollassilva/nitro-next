import { useShallow } from "zustand/shallow";

import { useCatalogContext } from "./useCatalogContext";

export const useCatalogSelectors = () => useCatalogContext(useShallow(x => ({
    catalogType: x.catalogType,
    rootNode: x.rootNode,
    activeNodes: x.activeNodes,
    isBusy: x.isBusy,
    activePageId: x.activePageId,
    activePage: x.activePage,
    activeOffer: x.activeOffer,
    frontPageItems: x.frontPageItems
})));