import { useCatalogSelectors } from "#base/context"

import { CatalogItemGridWidgetView } from "../widgets/CatalogItemGridWidgetView";
import { CatalogProductViewWidgetView } from "../widgets/CatalogProductViewWidgetView";

export const CatalogLayoutDefaultView = () => {
    const { activePage } = useCatalogSelectors();

    return (
        <>
            <CatalogProductViewWidgetView />
            <div className="min-h-47.5 max-h-47.5">
                <CatalogItemGridWidgetView />
            </div>
        </>
    );
}