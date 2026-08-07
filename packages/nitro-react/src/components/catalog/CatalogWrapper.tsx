import { useState } from "react";

import { CatalogContext, createCatalogContextStore } from "#base/context";

import { CatalogComponent } from "./CatalogComponent";

type CatalogWrapperProps = {
    catalogType: string;
}

export const CatalogWrapper = (props: CatalogWrapperProps) => {
    const { catalogType } = props;
    const [catalogCtx] = useState(() => createCatalogContextStore(catalogType));

    return (
        <CatalogContext value={catalogCtx}>
            <CatalogComponent />
        </CatalogContext>
    );
}
