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
        <Border variant="3" tintColor="#63c5e9" className="flex items-center justify-center p-0.5 min-h-16.25">
            <Border variant="3" className="size-full flex flex-col items-center gap-0.75 py-0.75 overflow-hidden">
                <Image wrapperClassName="min-w-[32px] min-h-[32px] max-w-[32px] max-h-[32px]" src={iconUrl} />
                <CatalogItemGridWidgetItemPriceView offer={offer} />
            </Border>
        </Border>
    );
}