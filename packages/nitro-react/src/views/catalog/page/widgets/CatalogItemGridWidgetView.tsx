
import { IPurchasableOffer } from "@nitrodevco/nitro-api";

import { useCatalogSelectors } from "#base/context"
import { Border, InfiniteGrid } from "#base/theme"

import { CatalogItemGridWidgetItemView } from "./CatalogItemGridWidgetItemView";

export const CatalogItemGridWidgetView = () => {
    const { activePage } = useCatalogSelectors();

    if (!activePage) return null;

    return (
        <Border variant="6" className="size-full" blend={0.5}>
            <InfiniteGrid<IPurchasableOffer>
                key="catalog-grid"
                items={activePage.offers}
                getKey={x => x.offerId}
                itemWidth={55}
                itemRender={x => <CatalogItemGridWidgetItemView offer={x} />} />
        </Border>
    )
}