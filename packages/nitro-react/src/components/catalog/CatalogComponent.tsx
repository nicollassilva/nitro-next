import { useState } from "react";

import { CatalogContext, createCatalogContextStore, useIsWindowVisible, useWebSocketContext } from "#base/context";
import { CatalogView } from "#base/views/catalog/CatalogView";

export const CatalogComponent = () => {
    const isVisible = useIsWindowVisible('catalog');
    const [catalogCtx] = useState(() => createCatalogContextStore());
    const { send } = useWebSocketContext();

    if (!isVisible) return null;

    return (
        <CatalogContext value={catalogCtx}>
            <CatalogView />
        </CatalogContext>
    );
}
