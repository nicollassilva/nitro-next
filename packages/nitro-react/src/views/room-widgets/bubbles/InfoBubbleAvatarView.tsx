import { ISimpleRoomObjectData } from "@nitrodevco/nitro-api";
import { useState } from "react";

import { useWebSocketContext } from "#base/context";
import { useRoomUserData } from "#base/hooks";
import { useLocalizationStore } from "#base/stores";
import { cn } from "#base/utils";

interface InfoBubbleAvatarViewProps {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
}

const MODE_NORMAL = 0;

export const InfoBubbleAvatarView = (props: InfoBubbleAvatarViewProps) => {
    const { objectData, onClose } = props;
    const { objectId, category } = objectData;
    const userData = useRoomUserData(objectId);
    const [mode, setMode] = useState<number>(MODE_NORMAL);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);
    const { send } = useWebSocketContext();

    if (!userData) return null;

    const processAction = (action: string) => {
        const hideMenu = true;

        if (hideMenu && onClose) onClose();
    }

    return (
        <div className={cn('contextmenu-container', collapsed && 'menu-collapsed')}>
            {!collapsed && <>
                <div className="flex items-center justify-center menu-header">
                    <p>{userData.name}</p>
                </div>
                <div className="menu-content">
                    {mode === MODE_NORMAL && <>
                        <div className="flex items-center justify-center underline menu-item">
                            {getLocalizationValue('widget.memenu.myclothes')}
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