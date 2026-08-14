import { IPurchasableOffer } from "@nitrodevco/nitro-api";

import { useCatalogOfferProduct, useProductIconUrl } from "#base/hooks";
import { Border } from "#base/theme";

import { CatalogItemGridWidgetItemPriceView } from "./CatalogItemGridWidgetItemPriceView";

type CatalogItemGridWidgetItemViewProps = {
    offer: IPurchasableOffer;
}

export const CatalogItemGridWidgetItemSelectedView = (props: CatalogItemGridWidgetItemViewProps) => {
    const { offer } = props;
    const product = useCatalogOfferProduct(offer);
    const iconUrl = useProductIconUrl(product!);

    if (!offer || !product) return null;

    return (
        <Border variant="3" tintColor="#63c5e9" className="flex items-center justify-center size-full p-0.5">
            <Border variant="3" className="size-full flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-10 h-10">
                    <img className="no-select [-webkit-user-drag:none]" src={iconUrl} />
                </div>
                <CatalogItemGridWidgetItemPriceView offer={offer} />
            </Border>
        </Border>
    );
}