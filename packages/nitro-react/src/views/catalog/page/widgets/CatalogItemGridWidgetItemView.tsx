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
    const { activeOffer } = useCatalogSelectors();
    const product = useCatalogOfferProduct(offer);
    const iconUrl = useProductIconUrl(product!);
    const { selectOffer } = useCatalogNavigation();

    if (activeOffer && (activeOffer.offerId == offer.offerId)) return <CatalogItemGridWidgetItemSelectedView offer={offer} />;

    return (
        <div className="flex items-center justify-center size-full p-0.5 cursor-pointer min-h-16.25">
            <div className="size-full flex flex-col items-center gap-0.75 py-0.75 overflow-hidden" onClick={() => selectOffer(offer)} data-active={activeOffer === offer}>
                <Image wrapperClassName="min-w-[32px] min-h-[32px] max-w-[32px] max-h-[32px]" src={iconUrl} />
                <CatalogItemGridWidgetItemPriceView offer={offer} />
            </div>
        </div>
    );
}