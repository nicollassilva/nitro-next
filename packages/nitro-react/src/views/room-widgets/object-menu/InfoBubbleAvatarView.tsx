import { ISimpleRoomObjectData } from "@nitrodevco/nitro-api";
import { useState } from "react";

import { useWebSocketContext } from "#base/context";
import { useOwnRespectData } from "#base/context/user/selectors/useOwnRespectData";
import { useRoomUserData } from "#base/hooks";
import { useLocalizationStore } from "#base/stores";
import { cn } from "#base/utils";

interface InfoBubbleAvatarViewProps {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
}

const MODE_NORMAL = 0;
const MODE_MODERATE = 1;
const MODE_MODERATE_BAN = 2;
const MODE_MODERATE_MUTE = 3;
const MODE_AMBASSADOR = 4;
const MODE_AMBASSADOR_MUTE = 5;
const MODE_RELATIONSHIP = 6;

export const InfoBubbleAvatarView = (props: InfoBubbleAvatarViewProps) => {
    const { objectData, onClose } = props;
    const { objectId, category } = objectData;
    const userData = useRoomUserData(objectId);
    const [mode, setMode] = useState<number>(MODE_NORMAL);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);
    const getLocalizationValueParams = useLocalizationStore(x => x.getLocalizationValueParams);
    const { respectLeft } = useOwnRespectData();
    const { send } = useWebSocketContext();

    if (!userData) return null;

    const processAction = (action: string) => {
        const hideMenu = true;

        if (hideMenu && onClose) onClose();
    }

    const canRequestFriend = true;

    return (
        <div className={cn('contextmenu-container', collapsed && 'menu-collapsed')}>
            {!collapsed && <>
                <div className="flex items-center justify-center menu-header">
                    <p>{userData.name}</p>
                </div>
                <div className="menu-content">
                    {mode === MODE_NORMAL && <>
                        {canRequestFriend && <div className="flex items-center justify-center menu-item" onClick={() => processAction('friend')}>
                            {getLocalizationValue('infostand.button.friend')}
                        </div>}
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('trade')}>
                            {getLocalizationValue('infostand.button.trade')}
                        </div>
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('whisper')}>
                            {getLocalizationValue('infostand.button.whisper')}
                        </div>
                        {respectLeft > 0 && <div className="flex items-center justify-center menu-item" onClick={() => processAction('whisper')}>
                            {getLocalizationValueParams('infostand.button.respect', ['count'], [respectLeft.toString()])}
                        </div>}
                        {!canRequestFriend && <div className="flex items-center justify-center menu-item" onClick={() => processAction('relationship')}>
                            {getLocalizationValue('infostand.link.relationship')}
                        </div>}
                        {!userData.isIgnored && <div className="flex items-center justify-center menu-item" onClick={() => processAction('ignore')}>
                            {getLocalizationValue('infostand.button.ignore')}
                        </div>}
                        {userData.isIgnored && <div className="flex items-center justify-center menu-item" onClick={() => processAction('unignore')}>
                            {getLocalizationValue('infostand.button.unignore')}
                        </div>}
                        <div className="flex items-center justify-center menu-item" onClick={() => processAction('report')}>
                            {getLocalizationValue('infostand.button.report')}
                        </div>
                    </>}
                </div>
            </>}
            <div className="flex items-center justify-center menu-bottom" onClick={() => setCollapsed(!collapsed)}>
                <i className={!collapsed ? 'nitro-icon icon-context-menu-arrow-down' : 'nitro-icon icon-context-menu-arrow-up'} />
            </div>
        </div>
    );
}