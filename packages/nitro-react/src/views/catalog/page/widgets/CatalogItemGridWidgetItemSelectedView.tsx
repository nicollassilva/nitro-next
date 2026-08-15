import { IPurchasableOffer } from "@nitrodevco/nitro-api";

import { useCatalogOfferProduct, useProductIconUrl } from "#base/hooks";
import { Border, Image } from "#base/theme";

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
            <Border variant="3" className="size-full flex flex-col items-center justify-center gap-0.75 min-h-0 py-0.75 overflow-hidden">
                <Image src={iconUrl} />
                <CatalogItemGridWidgetItemPriceView offer={offer} />
            </Border>
        </Border>
    );
}