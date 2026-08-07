import { useFriendsContext } from "#base/context";
import { useLocalizationStore } from "#base/stores";
import { Border, Button, NitroIcon } from "#base/theme";

export const FriendListRequestsFooter = () => {
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    const { tooltipHandlers } = useFriendsContext();

    return (
        <div className="h-16.5 shrink-0 px-1.5 py-1.25">
            <Border tintColor="#d8d8d8" className="h-full flex flex-col justify-center items-center px-1.25 gap-1">
                <Button className="px-2! py-1! w-full justify-start gap-2" { ...tooltipHandlers('friendlist.tip.acceptall') }>
                    <NitroIcon className="cursor-pointer" icon="icon-accept-check" />
                    { getLocalizationValue('friendlist.requests.acceptall') }
                </Button>
                <Button className="px-2! py-1! w-full justify-start gap-2.75" { ...tooltipHandlers('friendlist.tip.declineall') }>
                    <NitroIcon className="cursor-pointer" icon="icon-decline-x" />
                    { getLocalizationValue('friendlist.requests.dismissall') }
                </Button>
            </Border>
        </div>
    );
}