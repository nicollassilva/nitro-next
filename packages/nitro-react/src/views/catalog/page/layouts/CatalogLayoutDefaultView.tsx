import { useCatalogSelectors } from "#base/context"

import { CatalogItemGridWidgetView } from "../widgets/CatalogItemGridWidgetView";
import { CatalogProductViewWidgetView } from "../widgets/CatalogProductViewWidgetView";
import { CatalogPurchaseWidgetView } from "../widgets/CatalogPurchaseWidgetView";
import { CatalogSpinnerWidgetView } from "../widgets/CatalogSpinnerWidgetView";
import { CatalogTotalPriceWidgetView } from "../widgets/CatalogTotalPriceWidgetView";

export const CatalogLayoutDefaultView = () => {
    const { activePage } = useCatalogSelectors();

    return (
        <>
            <div className="min-h-60 max-h-60">
                <CatalogProductViewWidgetView />
            </div>
            <div className="min-h-0 h-full">
                <CatalogItemGridWidgetView />
            </div>
            <div className="flex flex-col items-end min-h-13.75 max-h-13.75 size-full gap-1 px-1.5">
                <div className="flex size-full gap-2">
                    <CatalogSpinnerWidgetView />
                    <CatalogTotalPriceWidgetView />
                </div>
                <CatalogPurchaseWidgetView />
            </div>
        </>
    );
}