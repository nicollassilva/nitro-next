import { SeasonalCurrencyView } from "./SeasonalCurrencyView";

export const SeasonalView = () => {
    const seasonals = [
        {
            amount: 0,
            color: '#feee65',
            name: 'Stars',
            icon: 'stars'
        },
        {
            amount: 122,
            color: '#f0c0d5',
            name: 'Chairs',
            icon: 'chairs'
        },
    ];

    return (
        <>
            <div className="nitro-seasonal-container">
                { seasonals.map(({ amount, color, name, icon }) =>
                    <SeasonalCurrencyView
                        amount={ amount }
                        color={ color }
                        name={ name }
                        icon={ icon }
                    /> )
                }
            </div>
        </>
    );
}