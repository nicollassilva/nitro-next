import { IPurchasableOffer } from "@nitrodevco/nitro-api";

import { useCatalogNavigation, useCatalogSelectors } from "#base/context";
import { useCatalogOfferProduct, useProductIconUrl } from "#base/hooks";

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

    return (
        <div className="flex flex-col items-center justify-center w-12.5 h-15 bg-no-repeat bg-center" onClick={() => selectOffer(offer)} data-active={activeOffer === offer}>
            <div className="size-full bg-no-repeat bg-center" style={{ backgroundImage: `url(${iconUrl})` }} />
            <span className="text-style-regular">{offer.priceInCredits}</span>
        </div>
    )
}