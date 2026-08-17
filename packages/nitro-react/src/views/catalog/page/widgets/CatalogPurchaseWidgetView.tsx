import { useCatalogActions, useCatalogSelectors, useTranslation } from "#base/context";
import { Border, Button, ButtonThick } from "#base/theme";

export const CatalogPurchaseWidgetView = () => {
    const { activeOffer, purchaseOptions } = useCatalogSelectors();
    const { setPurchaseOptions } = useCatalogActions();
    const t = useTranslation();

    return (
        <div className="flex items-center justify-center w-full gap-2">
            {!activeOffer &&
                <Border variant="6" blend={0.5} className="flex items-center justify-center size-full h-7.5">
                    <span className="text-style-headline-small text-[#666666]">{t('catalog.purchase.select.info')}</span>
                </Border>}
            {activeOffer &&
                <>
                    <Button variant="3" className="w-full" disabled={purchaseOptions.quantity > 1 || !activeOffer.giftable}>{t('catalog.purchase_confirmation.gift')}</Button>
                    <ButtonThick variant="3" tintColor="#00aa00" className="w-full text-white">{t('catalog.purchase_confirmation.buy')}</ButtonThick>
                </>}
        </div>
    )
}