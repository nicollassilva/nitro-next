import { useLocalizationStore } from "#base/stores";
import { Border, Button, NitroIcon } from "#base/theme";

export const PurseView = () => {
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    const currencies = [
        {
            amount: 200,
            className: 'diamonds',
            color: '#38caeb'
        },
        {
            amount: 9999999,
            className: 'credits',
            color: '#d5af22'
        },
        {
            amount: 5500,
            className: 'duckets',
            color: '#d787d7'
        }
    ]

    return (
        <>
            <Border id="purse" variant="9" className="nitro-purse">
                <div className="purse-grid">
                    <div className="purse-left">
                        { currencies.map(currency => (
                            <div key={ currency.className } className="purse-currency">
                                <span style={ { color: currency.color } }>{ currency.amount }</span>
                                <NitroIcon icon={ `icon-currency ${ currency.className }` } />
                            </div>
                        )) }
                    </div>
                    <div className="purse-mid">
                        <Border className="purse-button" variant="1" tintColor="#FFE1CC">
                            <NitroIcon icon="icon-hc-small" />
                            <span>{ getLocalizationValue('purse.clubdays.zero.amount.text') }</span>
                        </Border>
                        <Border className="purse-button" variant="1" tintColor="#FFE1CC">
                            <NitroIcon icon="icon-earnings-small" />
                            <span>{ getLocalizationValue('earnings.title') }</span>
                        </Border>
                    </div>
                    <div className="purse-right">
                        <Button className="text-white w-full overflow-hidden" variant="0" tintColor="#217bb5">
                            { getLocalizationValue('toolbar.help') }
                        </Button>
                        <Button className="text-white w-full overflow-hidden" variant="0" tintColor="#de5347">
                            <NitroIcon icon="icon-disconnect" />
                        </Button>
                        <Button className="text-white w-full overflow-hidden" variant="0" tintColor="#726b86">
                            <NitroIcon icon="icon-settings" />
                        </Button>
                    </div>
                </div>
            </Border>
        </>
    );
}