import { SendRoomInviteComposer } from "@nitrodevco/nitro-shared";
import { useState } from "react";

import { useFriendsContext, useSystemContext, useWebSocketContext } from "#base/context";
import { useLocalizationStore } from "#base/stores";
import { Border, Button, Frame } from "#base/theme";

export const FriendListRoomInviteView = () => {
    const { toggleWindow, isWindowVisible } = useSystemContext();
    const { send } = useWebSocketContext();
    const { selectedFriendsIds } = useFriendsContext();

    const [message, setMessage] = useState<string>('');

    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);
    const getLocalizationValueParams = useLocalizationStore(x => x.getLocalizationValueParams);

    const sendRoomInvite = () => {
        if(selectedFriendsIds.length < 1 || !message?.length || message.length > 255) return;

        send(new SendRoomInviteComposer({
            message,
            playerIds: selectedFriendsIds
        }));

        toggleWindow('friendlist_invite');
    }

    if(!isWindowVisible('friendlist_invite')) return null;

    return (
        <Frame variant="0" id="friendlist-room-invite" className="w-52.75 h-43.75" caption={ getLocalizationValue('friendlist.invite.title') } onClose={ () => toggleWindow('friendlist_invite') }>
            <Border className="h-29 px-2.25 py-1">
                <div className="block overflow-hidden whitespace-nowrap text-[0.7rem] mb-0.5">{ getLocalizationValueParams('friendlist.invite.summary', ['count'], [String(selectedFriendsIds.length)]) }</div>
                <textarea value={ message } name="room_invite_text" className="block border p-0.5 border-black text-[0.57rem] w-full font-goldfish resize-none h-17.5 scrollbar-none [&::-webkit-scrollbar]:hidden" onChange={ e => setMessage(e.target.value) } />
                <div className="block mt-px overflow-hidden whitespace-nowrap text-[0.7rem]">{ getLocalizationValue('friendlist.invite.note') }</div>                
            </Border>
            <div className="flex justify-between items-center mt-0.75">
                <Button className="h-5.5" onClick={ sendRoomInvite }>{ getLocalizationValue('friendlist.invite.send') }</Button>
                <Button className="h-5.5" onClick={ () => toggleWindow('friendlist_invite') }>{ getLocalizationValue('generic.cancel') }</Button>
            </div>
        </Frame>
    );
}