import { useWallet } from "#base/context";
import { useLocalizationStore } from "#base/stores";
import { Border, cn, NitroIcon } from "#base/theme";

export const ActivityPointsView = () => {
    const { activityPoints } = useWallet();
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    const kinds = [
        {
            amount: activityPoints[1] ?? 0,
            color: '#feee65',
            name: 'Stars',
            icon: 'stars'
        },
        {
            amount: activityPoints[2] ?? 0,
            color: '#f0c0d5',
            name: 'Chairs',
            icon: 'chairs'
        },
    ];

    return (
        <>
            {kinds.map(({ amount, color, name, icon }) =>
                <Border variant="9" className="pointer-events-auto cursor-pointer h-7.25 mt-0.75 flex justify-between w-full">
                    <div className="flex flex-1 pl-1.75 pr-4 justify-between items-center">
                        <span className="font-ubuntu-bold text-[0.7rem]" style={{ color }}>{name}</span>
                        <span className={cn('font-ubuntu-bold text-[0.7rem] text-white', amount <= 0 && 'zero')}>
                            {amount > 0 ? amount : getLocalizationValue('purse.shells.zero.amount.text')}
                        </span>
                    </div>
                    <Border tintColor={color} variant="9" className="w-7.25 h-7.25 flex justify-center items-center hover:brightness-[1.2]" style={{ backgroundColor: color, borderRadius: '6px' }}>
                        <NitroIcon icon={`icon-currency ${icon}`} />
                    </Border>
                </Border>)
            }
        </>
    );
}