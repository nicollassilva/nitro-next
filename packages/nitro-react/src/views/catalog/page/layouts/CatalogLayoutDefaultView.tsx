import { useCatalogSelectors } from "#base/context"

import { CatalogItemGridWidgetView } from "../widgets/CatalogItemGridWidgetView";
import { CatalogProductViewWidgetView } from "../widgets/CatalogProductViewWidgetView";
import { CatalogPurchaseWidgetView } from "../widgets/CatalogPurchaseWidgetView";
import { CatalogSpinnerWidgetView } from "../widgets/CatalogSpinnerWidgetView";

export const CatalogLayoutDefaultView = () => {
    const { activePage } = useCatalogSelectors();

    return (
        <>
            <CatalogProductViewWidgetView />
            <div className="min-h-47.5 max-h-47.5">
                <CatalogItemGridWidgetView />
            </div>
            <div className="flex flex-col items-end min-h-13.75 max-h-13.75 size-full gap-1 px-1.5">
                <div className="flex size-full">
                    <CatalogSpinnerWidgetView />
                </div>
                <CatalogPurchaseWidgetView />
            </div>
        </>
    );
}