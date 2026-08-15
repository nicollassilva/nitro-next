import { IPurchasableOffer } from "@nitrodevco/nitro-api";

import { useCatalogSelectors } from "#base/context";
import { useCatalogNavigation, useCatalogOfferProduct, useProductIconUrl } from "#base/hooks";
import { Image } from "#base/theme";

import { CatalogItemGridWidgetItemPriceView } from "./CatalogItemGridWidgetItemPriceView";
import { CatalogItemGridWidgetItemSelectedView } from "./CatalogItemGridWidgetItemSelectedView";

type CatalogItemGridWidgetItemViewProps = {
    offer: IPurchasableOffer;
}

export const CatalogItemGridWidgetItemView = (props: CatalogItemGridWidgetItemViewProps) => {
    const { offer } = props;
    const product = useCatalogOfferProduct(offer);
    const iconUrl = useProductIconUrl(product!);
    const { activeOffer } = useCatalogSelectors();
    const { selectOffer } = useCatalogNavigation();

    if (!offer || !product) return null;

    if (activeOffer === offer) return <CatalogItemGridWidgetItemSelectedView offer={offer} />;

    return (
        <div className="flex items-center justify-center size-full p-0.5 cursor-pointer">
            <div className="size-full flex flex-col items-center justify-center gap-0.75 min-h-0 py-0.75 overflow-hidden" onClick={() => selectOffer(offer)} data-active={activeOffer === offer}>
                <Image src={iconUrl} />
                <CatalogItemGridWidgetItemPriceView offer={offer} />
            </div>
        </div>
    );
}