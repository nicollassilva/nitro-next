import { useShallow } from "zustand/shallow";

import { useCatalogContext } from "./useCatalogContext";

export const useCatalogActions = () => useCatalogContext(useShallow(x => ({
    setRootNode: x.setRootNode,
    setOffersToNodes: x.setOffersToNodes,
    activateNode: x.activateNode
})));