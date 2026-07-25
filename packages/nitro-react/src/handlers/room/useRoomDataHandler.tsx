import { GetGuestRoomResultMessage } from "@nitrodevco/nitro-shared";

import { useRoomSettingActions } from "#base/context";
import { useMessageListener } from "#base/hooks";

export const useRoomDataHandler = () => {
    const { setTradeMode, setIsGuildRoom, setDoorMode, setAllowPets, setModerationSettings } = useRoomSettingActions();

    useMessageListener(GetGuestRoomResultMessage, data => {
        if (data.roomForward) return;

        const roomInfo = data.roomInfo;

        setTradeMode(roomInfo.tradeType);
        setIsGuildRoom(roomInfo.groupId !== 0);
        setDoorMode(roomInfo.doorMode);
        setAllowPets(roomInfo.allowPets);
        setModerationSettings(data.moderation.whoCanMute, data.moderation.whoCanKick, data.moderation.whoCanBan);
    });
}