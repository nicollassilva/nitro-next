import { AvatarActionStateType, AvatarExpressionEnum, ClubLevelEnum, IRoomUserData, PostureTypeEnum, RoomControllerLevelEnum, RoomObjectVariableEnum } from "@nitrodevco/nitro-api";
import { AvatarExpressionComposer, ChangePostureComposer, DanceComposer, DropCarryItemComposer, SignComposer } from "@nitrodevco/nitro-shared";
import { useState } from "react";

import { useClubLevel, useIsModerator, useOwnIsDancing, useOwnRoomObject, useRoomPermissionsSelector, useWebSocketContext } from "#base/context";
import { useLocalizationStore } from "#base/stores";
import { cn } from "#base/utils";

interface InfoBubbleOwnAvatarViewProps {
    activeData: IRoomUserData;
    onClose: () => void;
}

const MODE_NORMAL = 0;
const MODE_CLUB_DANCES = 1;
const MODE_NAME_CHANGE = 2;
const MODE_EXPRESSIONS = 3;
const MODE_SIGNS = 4;

export const InfoBubbleOwnAvatarView = (props: InfoBubbleOwnAvatarViewProps) => {
    const { activeData, onClose } = props;
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const isOwnDancing = useOwnIsDancing();
    const clubLevel = useClubLevel();
    const hasHabboClub = (clubLevel >= ClubLevelEnum.Club);
    const [mode, setMode] = useState<number>((isOwnDancing && hasHabboClub) ? MODE_CLUB_DANCES : MODE_NORMAL);
    const { controllerLevel, isRoomOwner } = useRoomPermissionsSelector();
    const isModerator = useIsModerator();
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);
    const { send } = useWebSocketContext();
    const roomObject = useOwnRoomObject();

    const effectId = roomObject?.model.getValue<number>(RoomObjectVariableEnum.FigureEffect) ?? 0;
    const carryId = roomObject?.model.getValue<number>(RoomObjectVariableEnum.FigureCarryObject) ?? 0;
    const isRidingHorse = effectId === 77;
    const posture = roomObject?.model.getValue<AvatarActionStateType>(RoomObjectVariableEnum.FigurePosture) ?? AvatarActionStateType.Stand;
    const canStandUp = roomObject?.model.getValue<boolean>(RoomObjectVariableEnum.FigureCanStandUp) ?? false;
    const canUseExpressions = effectId !== 29 && effectId !== 30 && effectId !== 185;

    const isShowDecorate = () => isRoomOwner || isModerator || controllerLevel > RoomControllerLevelEnum.Guest;

    const processAction = (action: string) => {
        let hideMenu = true;

        if (action?.length) {
            if (action.startsWith('sign_')) {
                send(new SignComposer({ signType: parseInt(action.split('_')[1]) ?? 0 }));
            } else {

                switch (action) {
                    case 'expressions': {
                        hideMenu = false;
                        setMode(MODE_EXPRESSIONS);
                        break;
                    }
                    case 'sit': send(new ChangePostureComposer({ postureType: PostureTypeEnum.Sit })); break;
                    case 'stand': send(new ChangePostureComposer({ postureType: PostureTypeEnum.Stand })); break;
                    case 'wave': send(new AvatarExpressionComposer({ expressionType: AvatarExpressionEnum.Wave })); break;
                    case 'blow': if (hasHabboClub) send(new AvatarExpressionComposer({ expressionType: AvatarExpressionEnum.Blow })); break;
                    case 'laugh': if (hasHabboClub) send(new AvatarExpressionComposer({ expressionType: AvatarExpressionEnum.Laugh })); break;
                    case 'idle': if (hasHabboClub) send(new AvatarExpressionComposer({ expressionType: AvatarExpressionEnum.Idle })); break;
                    case 'dance_menu': {
                        hideMenu = false;
                        setMode(MODE_CLUB_DANCES);
                        break;
                    }
                    case 'dance': send(new DanceComposer({ danceType: 1 })); break;
                    case 'dance_stop': send(new DanceComposer({ danceType: 0 })); break;
                    case 'dance_1':
                    case 'dance_2':
                    case 'dance_3':
                    case 'dance_4': {
                        send(new DanceComposer({ danceType: parseInt(action.split('_')[1]) ?? 0 }));
                        break;
                    }
                    case 'signs': {
                        hideMenu = false;
                        setMode(MODE_SIGNS);
                        break;
                    }
                    case 'back': {
                        hideMenu = false;
                        setMode(MODE_NORMAL);
                        break;
                    }
                    case 'drop_hand_item': send(new DropCarryItemComposer({})); break;
                }

            }
        }

        if (hideMenu && onClose) onClose();
    }

    return (
        <div className={cn('contextmenu-container', collapsed && 'menu-collapsed')}>
            {!collapsed && <>
                <div className="flex items-center justify-center menu-header">
                    <p>{activeData.name}</p>
                </div>
                {mode === MODE_NORMAL && <>
                    {isShowDecorate() && <div className="flex items-center justify-center menu-item">
                        {getLocalizationValue('widget.avatar.decorate')}
                    </div>}
                    <div className="flex items-center justify-center underline menu-item">
                        {getLocalizationValue('widget.memenu.myclothes')}
                    </div>
                    {hasHabboClub && !isRidingHorse && <div className="flex items-center justify-center menu-item" onClick={e => processAction('dance_menu')}>
                        {getLocalizationValue('widget.memenu.dance')}
                    </div>}
                    {!isOwnDancing && !hasHabboClub && !isRidingHorse && <div className="flex items-center justify-center menu-item" onClick={e => processAction('dance')}>
                        {getLocalizationValue('widget.memenu.dance')}
                    </div>}
                    {isOwnDancing && !hasHabboClub && !isRidingHorse && <div className="flex items-center justify-center menu-item" onClick={e => processAction('dance_stop')}>
                        {getLocalizationValue('widget.memenu.dance.stop')}
                    </div>}
                    <div className="flex items-center justify-center menu-item" onClick={e => processAction('expressions')}>
                        {getLocalizationValue('infostand.link.expressions')}
                    </div>
                    <div className="flex items-center justify-center menu-item" onClick={e => processAction('signs')}>
                        {getLocalizationValue('infostand.show.signs')}
                    </div>
                    {carryId > 0 && <div className="flex items-center justify-center menu-item" onClick={e => processAction('drop_hand_item')}>
                        {getLocalizationValue('avatar.widget.drop_hand_item')}
                    </div>}
                </>}
                {mode === MODE_CLUB_DANCES && <>
                    {isOwnDancing && <div className="flex items-center justify-center menu-item" onClick={e => processAction('dance_stop')}>
                        {getLocalizationValue('widget.memenu.dance.stop')}
                    </div>}
                    <div className="flex items-center justify-center menu-item" onClick={e => processAction('dance_1')}>
                        {getLocalizationValue('widget.memenu.dance1')}
                    </div>
                    <div className="flex items-center justify-center menu-item" onClick={e => processAction('dance_2')}>
                        {getLocalizationValue('widget.memenu.dance2')}
                    </div>
                    <div className="flex items-center justify-center menu-item" onClick={e => processAction('dance_3')}>
                        {getLocalizationValue('widget.memenu.dance3')}
                    </div>
                    <div className="flex items-center justify-center menu-item" onClick={e => processAction('dance_4')}>
                        {getLocalizationValue('widget.memenu.dance4')}
                    </div>
                    <div className="flex items-center justify-center menu-item" onClick={e => processAction('back')}>
                        {getLocalizationValue('generic.back')}
                    </div>
                </>}
                {mode === MODE_EXPRESSIONS && <>
                    {(posture === AvatarActionStateType.Stand) && <div className="flex items-center justify-center menu-item" onClick={e => processAction('sit')}>
                        {getLocalizationValue('widget.memenu.sit')}
                    </div>}
                    {canStandUp && <div className="flex items-center justify-center menu-item" onClick={e => processAction('stand')}>
                        {getLocalizationValue('widget.memenu.stand')}
                    </div>}
                    {canUseExpressions && <div className="flex items-center justify-center menu-item" onClick={e => processAction('wave')}>
                        {getLocalizationValue('widget.memenu.wave')}
                    </div>}
                    {canUseExpressions && <div className="flex items-center justify-center menu-item" onClick={e => processAction('laugh')}>
                        {getLocalizationValue('widget.memenu.laugh')}
                    </div>}
                    {canUseExpressions && <div className="flex items-center justify-center menu-item" onClick={e => processAction('blow')}>
                        {getLocalizationValue('widget.memenu.blow')}
                    </div>}
                    <div className="flex items-center justify-center menu-item" onClick={e => processAction('idle')}>
                        {getLocalizationValue('widget.memenu.idle')}
                    </div>
                    <div className="flex items-center justify-center menu-item" onClick={e => processAction('back')}>
                        {getLocalizationValue('generic.back')}
                    </div>
                </>}
                {mode === MODE_SIGNS && <>
                    <div className="flex justify-evenly nth-[3n+3]:mr-0">
                        <div className="flex items-center justify-center w-full menu-item" onClick={e => processAction('sign_1')}>1</div>
                        <div className="flex items-center justify-center w-full menu-item" onClick={e => processAction('sign_2')}>2</div>
                        <div className="flex items-center justify-center w-full menu-item" onClick={e => processAction('sign_3')}>3</div>
                    </div>
                    <div className="flex justify-evenly nth-[3n+3]:mr-0">
                        <div className="flex items-center justify-center w-full menu-item" onClick={e => processAction('sign_4')}>4</div>
                        <div className="flex items-center justify-center w-full menu-item" onClick={e => processAction('sign_5')}>5</div>
                        <div className="flex items-center justify-center w-full menu-item" onClick={e => processAction('sign_6')}>6</div>
                    </div>
                    <div className="flex justify-evenly nth-[3n+3]:mr-0">
                        <div className="flex items-center justify-center w-full menu-item" onClick={e => processAction('sign_7')}>7</div>
                        <div className="flex items-center justify-center w-full menu-item" onClick={e => processAction('sign_8')}>8</div>
                        <div className="flex items-center justify-center w-full menu-item" onClick={e => processAction('sign_9')}>9</div>
                    </div>
                    <div className="flex justify-evenly nth-[3n+3]:mr-0">
                        <div className="flex items-center justify-center w-full menu-item" onClick={e => processAction('sign_10')}>10</div>
                        <div className="flex items-center justify-center w-full menu-item" onClick={e => processAction('sign_11')}><i className="nitro-icon icon-sign-heart" /></div>
                        <div className="flex items-center justify-center w-full menu-item" onClick={e => processAction('sign_12')}><i className="nitro-icon icon-sign-skull" /></div>
                    </div>
                    <div className="flex justify-evenly nth-[3n+3]:mr-0">
                        <div className="flex items-center justify-center w-full menu-item" onClick={e => processAction('sign_0')}>0</div>
                        <div className="flex items-center justify-center w-full menu-item" onClick={e => processAction('sign_13')}><i className="nitro-icon icon-sign-exclamation" /></div>
                        <div className="flex items-center justify-center w-full menu-item" onClick={e => processAction('sign_15')}><i className="nitro-icon icon-sign-smile" /></div>
                    </div>
                    <div className="flex justify-evenly nth-[3n+3]:mr-0">
                        <div className="flex items-center justify-center w-full menu-item" onClick={e => processAction('sign_14')}><i className="nitro-icon icon-sign-soccer" /></div>
                        <div className="flex items-center justify-center w-full menu-item" onClick={e => processAction('sign_17')}><i className="nitro-icon icon-sign-yellow" /></div>
                        <div className="flex items-center justify-center w-full menu-item" onClick={e => processAction('sign_16')}><i className="nitro-icon icon-sign-red" /></div>
                    </div>
                    <div className="flex items-center justify-center menu-item" onClick={e => processAction('back')}>
                        {getLocalizationValue('generic.back')}
                    </div>
                </>}
            </>}
            <div className="flex items-center justify-center menu-bottom" onClick={e => setCollapsed(!collapsed)}>
                <i className={!collapsed ? 'nitro-icon icon-context-menu-arrow-down' : 'nitro-icon icon-context-menu-arrow-up'} />
            </div>
        </div>
    );
}