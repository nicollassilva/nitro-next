import { RemoveFriendComposer } from "@nitrodevco/nitro-shared";

import { useFriendsContext, useFriendsSelector, useSystemContext, useWebSocketContext } from "#base/context";
import { useLocalizationStore } from "#base/stores";
import { Border, Button, Frame } from "#base/theme";

export const FriendListRemoveConfirmationView = () => {
    const { toggleWindow, isWindowVisible } = useSystemContext();
    const { selectedFriendsIds, setSelectedFriendsIds } = useFriendsContext();
    const { send } = useWebSocketContext();

    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);
    const getLocalizationValueParams = useLocalizationStore(x => x.getLocalizationValueParams);

    const friends = useFriendsSelector();

    const usernames = Object.values(friends)
        .filter(friend => selectedFriendsIds.includes(friend.playerId))
        .map(friend => friend.name)
        .join(', ')

    const removeFriends = () => {
        if(selectedFriendsIds.length < 1) return;

        send(new RemoveFriendComposer({ playerIds: selectedFriendsIds }));

        setSelectedFriendsIds([]);
        toggleWindow('friendlist_remove_confirmation');
    }

    if(!isWindowVisible('friendlist_remove_confirmation')) return null;

    return (
        <Frame variant="0" id="friendlist-room-invite" className="w-52.75 h-43.75" caption={ getLocalizationValue('friendlist.removefriendconfirm.title') } onClose={ () => toggleWindow('friendlist_remove_confirmation') }>
            <Border className="h-29 px-2.25 py-1 overflow-hidden">
                <div className="text-[0.7rem] mb-0.5 leading-3.5">{ getLocalizationValueParams('friendlist.removefriendconfirm.userlist', ['user_names'], [usernames]) }</div>
            </Border>
            <div className="flex justify-between items-center mt-0.75">
                <Button className="h-5.5" onClick={ removeFriends }>{ getLocalizationValue('generic.ok') }</Button>
                <Button className="h-5.5" onClick={ () => toggleWindow('friendlist_remove_confirmation') }>{ getLocalizationValue('generic.cancel') }</Button>
            </div>
        </Frame>
    );
}