import { AvatarActionStateType, AvatarExpressionEnum, ISimpleRoomObjectData, PostureTypeEnum } from "@nitrodevco/nitro-api";
import { AvatarExpressionComposer, ChangePostureComposer, DanceComposer, DropCarryItemComposer, SignComposer } from "@nitrodevco/nitro-shared";
import { useState } from "react";

import { useOwnHasClub, useOwnIsDancing, useRoomCanDecorate, useWebSocketContext } from "#base/context";
import { useRoomUserData } from "#base/hooks";
import { useLocalizationStore } from "#base/stores";
import { Bubble, Button, NitroIcon } from "#base/theme";

interface InfoBubbleOwnAvatarViewProps {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
}

const MODE_NORMAL = 0;
const MODE_CLUB_DANCES = 1;
const MODE_NAME_CHANGE = 2;
const MODE_EXPRESSIONS = 3;
const MODE_SIGNS = 4;

export const InfoBubbleOwnAvatarView = (props: InfoBubbleOwnAvatarViewProps) => {
    const { objectData, onClose } = props;
    const { objectId, category } = objectData;
    const userData = useRoomUserData(objectId);
    const isOwnDancing = useOwnIsDancing();
    const hasHabboClub = useOwnHasClub();
    const canDecorate = useRoomCanDecorate();
    const [mode, setMode] = useState<number>((isOwnDancing && hasHabboClub) ? MODE_CLUB_DANCES : MODE_NORMAL);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);
    const { send } = useWebSocketContext();

    if (!userData) return null;

    const isRidingHorse = userData.effectId === 77;
    const canUseExpressions = userData.effectId !== 29 && userData.effectId !== 30 && userData.effectId !== 185;

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

    const MODE_NORMAL_ACTIONS = [
        {
            visible: canDecorate,
            caption: 'widget.avatar.decorate',
            action: undefined
        },
        {
            visible: true,
            caption: 'widget.memenu.myclothes',
            action: undefined
        },
        {
            visible: hasHabboClub && !isRidingHorse,
            caption: 'widget.memenu.dance',
            action: () => processAction('dance_menu')
        },
        {
            visible: !isOwnDancing && !hasHabboClub && !isRidingHorse,
            caption: 'widget.avatar.dance',
            action: () => processAction('dance')
        },
        {
            visible: isOwnDancing && !hasHabboClub && !isRidingHorse,
            caption: 'widget.memenu.dance.stop',
            action: () => processAction('dance_stop')
        },
        {
            visible: true,
            caption: 'infostand.link.expressions',
            action: () => processAction('expressions')
        },
        {
            visible: true,
            caption: 'infostand.show.signs',
            action: () => processAction('signs')
        },
        {
            visible: userData.carryItem > 0,
            caption: 'avatar.widget.drop_hand_item',
            action: () => processAction('drop_hand_item')
        }
    ];

    const MODE_BUTTONS = {
        0: [
            {
                visible: canDecorate,
                caption: 'widget.avatar.decorate',
                action: undefined
            },
            {
                visible: true,
                caption: 'widget.memenu.myclothes',
                action: undefined
            },
            {
                visible: hasHabboClub && !isRidingHorse,
                caption: 'widget.memenu.dance',
                action: () => processAction('dance_menu')
            },
            {
                visible: !isOwnDancing && !hasHabboClub && !isRidingHorse,
                caption: 'widget.avatar.dance',
                action: () => processAction('dance')
            },
            {
                visible: isOwnDancing && !hasHabboClub && !isRidingHorse,
                caption: 'widget.memenu.dance.stop',
                action: () => processAction('dance_stop')
            },
            {
                visible: true,
                caption: 'infostand.link.expressions',
                action: () => processAction('expressions')
            },
            {
                visible: true,
                caption: 'infostand.show.signs',
                action: () => processAction('signs')
            },
            {
                visible: userData.carryItem > 0,
                caption: 'avatar.widget.drop_hand_item',
                action: () => processAction('drop_hand_item')
            }
        ],
        1: [
            {
                visible: isOwnDancing,
                caption: 'widget.memenu.dance.stop',
                action: () => processAction('dance_stop')
            },
            {
                visible: true,
                caption: 'widget.memenu.dance1',
                action: () => processAction('dance_1')
            },
            {
                visible: true,
                caption: 'widget.memenu.dance2',
                action: () => processAction('dance_2')
            },
            {
                visible: true,
                caption: 'widget.memenu.dance3',
                action: () => processAction('dance_3')
            },
            {
                visible: true,
                caption: 'widget.memenu.dance4',
                action: () => processAction('dance_4')
            },
            {
                visible: true,
                caption: 'generic.back',
                action: () => processAction('back')
            }
        ],
        3: [
            {
                visible: userData.posture === AvatarActionStateType.Stand,
                caption: 'widget.memenu.sit',
                action: () => processAction('sit')
            },
            {
                visible: userData.canStandUp,
                caption: 'widget.memenu.stand',
                action: () => processAction('stand')
            },
            {
                visible: true,
                caption: 'widget.memenu.wave',
                action: () => processAction('wave')
            },
            {
                visible: true,
                caption: 'widget.memenu.laugh',
                action: () => processAction('laugh')
            },
            {
                visible: true,
                caption: 'widget.memenu.blow',
                action: () => processAction('blow')
            },
            {
                visible: true,
                caption: 'widget.memenu.idle',
                action: () => processAction('idle')
            },
            {
                visible: true,
                caption: 'generic.back',
                action: () => processAction('back')
            }
        ],
        4: [

        ]
    }

    return (
        <Bubble className="min-w-28.75" variant="0" tintColor="#6e6b67">
            <div className="flex flex-col mx-px overflow-hidden">
                <div className="flex items-center justify-center py-1.5 px-4.5 m-h-7.5 max-h-7.5 z-20">
                    <span className="text-style-u-bold font-[11px] text-white">{userData.name}</span>
                </div>
                <div className="h-px w-full bg-black z-20" />
                <div className="flex flex-col w-[calc(100%+10px)] -ml-1.25 px-px overflow-hidden z-10 gap-px">
                    {MODE_BUTTONS[mode].map(({ visible, caption, action }) =>
                        visible ? <div className="flex items-center justify-center min-h-6.5 max-h-6.5 overflow-hidden">
                            <Button variant="3" tintColor="#2d2a27" className="min-h-8.75 max-h-[8.75] text-white text-[11px] w-full p-0!" onClick={action}>{getLocalizationValue(caption)}</Button>
                        </div> : null)}
                </div>
                <div className="h-px w-full bg-black z-20" />
                <div className="flex items-center justify-center min-h-4.5 max-h-4.5 z-20" onClick={() => setCollapsed(!collapsed)}>
                    <NitroIcon className="cursor-pointer" icon={!collapsed ? 'icon-context-menu-arrow-down' : 'icon-context-menu-arrow-up'} />
                </div>
            </div>
        </Bubble>
    );
}