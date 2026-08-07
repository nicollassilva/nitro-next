import { useShallow } from "zustand/shallow";

import { useCatalogContext } from "./useCatalogContext";

export const useCatalogSelectors = () => useCatalogContext(useShallow(x => ({
    catalogType: x.catalogType,
    rootNode: x.rootNode,
    activeNodes: x.activeNodes
})));