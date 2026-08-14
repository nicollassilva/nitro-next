import { CatalogPricingTypeEnum, IPurchasableOffer } from "@nitrodevco/nitro-api"

import { NitroIcon } from "#base/theme";

type CatalogItemGridWidgetItemPriceViewProps = {
    offer: IPurchasableOffer;
}

export const CatalogItemGridWidgetItemPriceView = (props: CatalogItemGridWidgetItemPriceViewProps) => {
    const { offer } = props;

    if (!offer || offer.pricingType === CatalogPricingTypeEnum.None) return null;

    return (
        <div className="flex flex-col justify-end w-full gap-0.5 text-style-u-bold leading-none px-px">
            {(offer.pricingType === CatalogPricingTypeEnum.Credits || offer.pricingType === CatalogPricingTypeEnum.CreditsActivityPoints) &&
                <div className="flex items-center justify-end gap-1">
                    <span>{offer.priceInCredits}</span>
                    <NitroIcon icon="catalog-small-coin" />
                </div>}
            {offer.pricingType === CatalogPricingTypeEnum.CreditsActivityPoints &&
                <div className="flex items-center justify-end gap-1">
                    <span>+</span>
                    <div className="flex items-center gap-1">
                        <span>{offer.priceInActivityPoints}</span>
                        <NitroIcon icon="catalog-small-diamond" />
                    </div>
                </div>}
        </div>
    );
}