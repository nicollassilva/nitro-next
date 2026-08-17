import { CatalogPricingTypeEnum } from "@nitrodevco/nitro-api";

import { useCatalogSelectors, useTranslation } from "#base/context";
import { NitroCurrencyIcon } from "#base/theme";


export const CatalogTotalPriceWidgetView = () => {
    const { activeOffer } = useCatalogSelectors();
    const t = useTranslation();

    if (!activeOffer) return null;

    return (
        <div className="flex items-center justify-between gap-1 w-full">
            <span className="text-style-u-regular text-[#666666]">{t('catalog.bundlewidget.price')}</span>
            <div className="flex items-center gap-1 text-style-u-bold text-[14px]">
                {(activeOffer.pricingType === CatalogPricingTypeEnum.Credits || activeOffer.pricingType === CatalogPricingTypeEnum.CreditsActivityPoints) &&
                    <div className="flex items-center justify-end gap-1">
                        <span>{activeOffer.priceInCredits}</span>
                        <NitroCurrencyIcon type="-1" />
                    </div>}
                {activeOffer.pricingType === CatalogPricingTypeEnum.CreditsActivityPoints &&
                    <div className="flex items-center justify-end gap-1">
                        <span>+</span>
                        <div className="flex items-center gap-1">
                            <span>{activeOffer.priceInActivityPoints}</span>
                            <NitroCurrencyIcon type={activeOffer.activityPointType.toString()} />
                        </div>
                    </div>}
            </div>
        </div>
    )
}