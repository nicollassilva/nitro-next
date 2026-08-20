import { CatalogPricingTypeEnum } from "@nitrodevco/nitro-api";
import { PurchaseFromCatalogComposer, PurchaseOKMessage } from "@nitrodevco/nitro-packets";

import { useCatalogActions, useCatalogSelectors, useTranslation, useWebSocketContext } from "#base/context";
import { useCatalogOfferActions, useMessageListener } from "#base/hooks";
import { Border, Button, ButtonThick, Frame, NitroCurrencyIcon } from "#base/theme";

import { CatalogOfferImageView } from "./CatalogOfferImageView";

export const CatalogPurchaseConfirmationView = () => {
    const { activePurchase } = useCatalogSelectors();
    const { setActivePurchase } = useCatalogActions();
    const { getOfferProduct } = useCatalogOfferActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();

    useMessageListener(PurchaseOKMessage, data => {
        if (!activePurchase?.offer || !data.offer || data.offer.id !== activePurchase.offer.offerId) return;

        setActivePurchase(undefined);
    });

    if (!activePurchase?.offer) return null;

    const { offer, quantity, extraData } = activePurchase;
    const product = getOfferProduct(offer);

    if (!product) return null;

    const purchase = () => {
        send(new PurchaseFromCatalogComposer({
            pageId: offer.page?.pageId ?? -1,
            offerId: offer.offerId,
            extraParam: extraData,
            quantity,

        }));
    }

    const cancelPurchase = () => {
        setActivePurchase(undefined);
    }

    return (
        <Frame id="catalog-purchase-confirmation" variant="3" className="min-w-81.25 h-60" caption={t('catalog.purchase_confirmation.title')} onClose={cancelPurchase}>
            <div className="flex flex-col items-center p-2 gap-2 size-full">
                <div className="flex items-center justify-center gap-2 w-full">
                    <Border variant="0" className="w-31.5 h-38 flex items-center justify-center overflow-hidden">
                        <CatalogOfferImageView offer={offer} />
                    </Border>
                    <div className="flex flex-col grow h-full justify-center gap-1">
                        <span className="text-style-u-bold text-[14px]">{product.productData?.name ?? t(offer.localizationId)}</span>
                        {quantity > 1 && <span className="text-style-u-bold text-[14px]">X {quantity}</span>}
                        <div className="flex">
                            <div className="flex items-center gap-1 w-full">
                                <span className="text-style-u-regular text-[14px]">{t('catalog.purchase.confirmation.dialog.cost')}</span>
                                <div className="flex items-center gap-1 text-style-u-bold text-[14px]">
                                    {(offer.pricingType === CatalogPricingTypeEnum.Credits || offer.pricingType === CatalogPricingTypeEnum.CreditsActivityPoints) &&
                                        <div className="flex items-center justify-end gap-1">
                                            <span>{offer.priceInCredits}</span>
                                            <NitroCurrencyIcon type="-1" />
                                        </div>}
                                    {offer.pricingType === CatalogPricingTypeEnum.CreditsActivityPoints &&
                                        <div className="flex items-center justify-end gap-1">
                                            <span>+</span>
                                            <div className="flex items-center gap-1">
                                                <span>{offer.priceInActivityPoints}</span>
                                                <NitroCurrencyIcon type={offer.activityPointType.toString()} />
                                            </div>
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 size-full">
                    <Button variant="3" className="w-full" onClick={cancelPurchase}>{t('catalog.purchase_confirmation.cancel')}</Button>
                    <ButtonThick variant="3" tintColor="#00aa00" className="w-full text-white" onClick={purchase}>{t('catalog.purchase_confirmation.buy')}</ButtonThick>
                </div>
            </div>
        </Frame >
    );
}