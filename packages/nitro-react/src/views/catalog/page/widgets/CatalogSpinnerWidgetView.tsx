import { useState } from "react";

import { useCatalogActions, useCatalogSelectors, useTranslation } from "#base/context";
import { Border } from "#base/theme";

const MIN_VALUE: number = 1;
const MAX_VALUE: number = 100;

export const CatalogSpinnerWidgetView = () => {
    const { activeOffer, purchaseOptions } = useCatalogSelectors();
    const [quantityValue, setQuantityValue] = useState<string>(purchaseOptions.quantity.toString());
    const { setPurchaseOptions } = useCatalogActions();
    const t = useTranslation();

    const updateQuantity = (value: string) => {
        let quantity = parseInt(value);

        if (isNaN(quantity)) quantity = 1;

        quantity = Math.max(quantity, MIN_VALUE);
        quantity = Math.min(quantity, MAX_VALUE);

        if (quantity !== purchaseOptions.quantity) setPurchaseOptions({ quantity });

        if (value === '') {
            setQuantityValue('');
        } else {
            setQuantityValue(quantity.toString());
        }
    }

    if (!activeOffer || !activeOffer.bundlePurchaseAllowed) return null;

    return (
        <div className="flex items-center gap-1 w-full">
            <span className="text-style-u-regular text-[#666666]">{t('catalog.bundlewidget.quantity')}</span>
            <Border variant="0" className="flex items-center justify-center min-h-6.25 max-h-6.25 min-w-7.5 max-w-7.5 px-1.5">
                <input type="text" className="flex-1 min-w-0 text-style-u-small" inputMode="numeric" value={quantityValue} onChange={event => updateQuantity(event.target.value)} />
            </Border>
        </div>
    )
}