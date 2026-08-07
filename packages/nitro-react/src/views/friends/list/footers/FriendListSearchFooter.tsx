import { useFriendsContext } from "#base/context";
import { useLocalizationStore } from "#base/stores";
import { Border, Button, NitroIcon } from "#base/theme";

export const FriendListSearchFooter = () => {
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    const { tooltipHandlers } = useFriendsContext();

    return (
        <div className="h-10 shrink-0 px-1.5 py-1.25">
            <Border tintColor="#838383" className="h-full flex justify-center items-center px-1.5 gap-1">
                <input name="habbo_search" className="flex-1 min-w-0 px-1 bg-white h-5.25 mt-px border border-black text-[0.75rem] text-black" type="text" { ...tooltipHandlers('friendlist.tip.searchstr') } />
                <Button variant="0" className="shrink-0 h-5.25 gap-1 px-1.5! py-1!" { ...tooltipHandlers('friendlist.tip.search') }>
                    <NitroIcon icon="icon-search-outline" />
                    { getLocalizationValue('generic.search') }
                </Button>
            </Border>
        </div>
    );
}
