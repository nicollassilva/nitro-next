import { CatalogPricingTypeEnum, IPurchasableOffer } from "@nitrodevco/nitro-api"

import { NitroCurrencyIcon } from "#base/theme";

type CatalogItemGridWidgetItemPriceViewProps = {
    offer: IPurchasableOffer;
}

export const CatalogItemGridWidgetItemPriceView = (props: CatalogItemGridWidgetItemPriceViewProps) => {
    const { offer } = props;

    if (!offer || offer.pricingType === CatalogPricingTypeEnum.None) return null;

    return (
        <div className="flex flex-col w-full gap-0.5 text-style-u-bold leading-none px-1">
            {(offer.pricingType === CatalogPricingTypeEnum.Credits || offer.pricingType === CatalogPricingTypeEnum.CreditsActivityPoints) &&
                <div className="flex items-center justify-end gap-0.5">
                    <span>{offer.priceInCredits}</span>
                    <NitroCurrencyIcon type="-1" mini />
                </div>}
            {offer.pricingType === CatalogPricingTypeEnum.CreditsActivityPoints &&
                <div className="flex items-center justify-end gap-0.5">
                    <span>+</span>
                    <div className="flex items-center gap-0.5">
                        <span>{offer.priceInActivityPoints}</span>
                        <NitroCurrencyIcon type={offer.activityPointType.toString()} mini />
                    </div>
                </div>}
        </div>
    );
}