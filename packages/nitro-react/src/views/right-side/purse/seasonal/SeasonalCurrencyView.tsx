import { HTMLAttributes } from "react";

import { useLocalizationStore } from "#base/stores";
import { Border, cn } from "#base/theme";


interface SeasonalCurrencyProps extends HTMLAttributes<HTMLDivElement> {
    amount: number;
    color: string;
    name: string;
    icon: string;
}

export const SeasonalCurrencyView = (props: SeasonalCurrencyProps) => {
    const { amount, color, name, icon } = props;

    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);
    
    return (
        <>
            <Border variant="9" className="nitro-seasonal-currency">
                <div className="seasonal-data">
                    <span className="seasonal-name" style={{ color }}>{ name }</span>
                    <span className={ cn('seasonal-amount', amount <= 0 && 'zero') }>
                        { amount > 0 ? amount : getLocalizationValue('purse.shells.zero.amount.text') }
                    </span>
                </div>
                <Border tintColor={ color } variant="9" className="nitro-seasonal-currency-icon" style={{ backgroundColor: color, borderRadius: '6px' }}>
                    {/** icon */}
                </Border>
            </Border>
        </>
    );
}