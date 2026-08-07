import { useFriendsContext, useSystemContext } from "#base/context";
import { useLocalizationStore } from "#base/stores";
import { Border, Frame } from "#base/theme";

export const FriendListRoomInviteView = () => {
    const { toggleWindow, isWindowVisible } = useSystemContext();
    const { selectedFriendsIds } = useFriendsContext();
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);
    const getLocalizationValueParams = useLocalizationStore(x => x.getLocalizationValueParams);

    if(!isWindowVisible('friendlist_invite')) return null;

    return (
        <Frame variant="0" id="friendlist-room-invite" className="w-52.75 h-43.75" caption={ getLocalizationValue('friendlist.invite.title') } onClose={ () => toggleWindow('friendlist_invite') }>
            <Border className="h-29 px-2.5 py-1">
                <span className="block overflow-hidden whitespace-nowrap text-xs">{ getLocalizationValueParams('friendlist.invite.summary', ['count'], [String(selectedFriendsIds.length)]) }</span>
            </Border>
        </Frame>
    );
}