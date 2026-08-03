import { useWallet } from "#base/context";
import { useLocalizationStore } from "#base/stores";
import { Border, Button, NitroIcon } from "#base/theme";

export const PurseView = () => {
    const currency = useWallet();
    const duckets = currency.activityPoints[1] ?? 0;
    const diamonds = currency.activityPoints[5] ?? 0;
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    const currencies = [
        {
            amount: 200,
            className: 'diamonds',
            color: '#38caeb'
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
                        <div className="purse-currency">
                            <span className="text-[#38caeb]">{diamonds}</span>
                            <NitroIcon icon={`icon-currency diamonds`} />
                        </div>
                        <div className="purse-currency">
                            <span className="text-[#d5af22]">{currency.credits}</span>
                            <NitroIcon icon={`icon-currency credits`} />
                        </div>
                        <div className="purse-currency">
                            <span className="text-[#d787d7]">{duckets}</span>
                            <NitroIcon icon={`icon-currency duckets`} />
                        </div>
                    </div>
                    <div className="purse-mid">
                        <Border className="purse-button" variant="1" tintColor="#FFE1CC">
                            <NitroIcon icon="icon-hc-small" />
                            <span>{getLocalizationValue('purse.clubdays.zero.amount.text')}</span>
                        </Border>
                        <Border className="purse-button" variant="1" tintColor="#FFE1CC">
                            <NitroIcon icon="icon-earnings-small" />
                            <span>{getLocalizationValue('earnings.title')}</span>
                        </Border>
                    </div>
                    <div className="purse-right">
                        <Button className="text-white w-full overflow-hidden" variant="0" tintColor="#217bb5">
                            {getLocalizationValue('toolbar.help')}
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