import { useRef, useState } from 'react';

import { ToolbarMeMenu } from './ToolbarMeMenu';
import { ToolbarProgressionMenu } from './ToolbarProgressionMenu';
import { cn } from '#base/utils';
import { useOwnUserFigure, useOwnUserGender } from '#base/context';
import { AvatarImage } from '#base/components/AvatarImage';
import { AvatarGenderType } from '@nitrodevco/nitro-api';

export const ToolbarView = () => {
    const [isMeExpanded, setMeExpanded] = useState(false);
    const [isProgressionExpanded, setProgressionExpanded] = useState(false);
    const [leftSideCollapsed, setLeftSideCollapsed] = useState(false);
    const [rightSideCollapsed, setRightSideCollapsed] = useState(false);

    const meElementRef = useRef<HTMLDivElement>(null);
    const progressionElementRef = useRef<HTMLDivElement>(null);

    const [userFigure, userGender] = [useOwnUserFigure(), useOwnUserGender()];

    const toggleMenu = (menu: string) => {
        setMeExpanded(menu == 'me' && !isMeExpanded);
        setProgressionExpanded(menu == 'progression' && !isProgressionExpanded);
    };

    return (
        <>
            {isMeExpanded && <ToolbarMeMenu ref={meElementRef} />}
            {isProgressionExpanded && (
                <ToolbarProgressionMenu ref={progressionElementRef} />
            )}
            <div className="nitro-toolbar">
                <div className={cn('toolbar-left', leftSideCollapsed && 'collapsed')}>
                    <div
                        className={cn(
                            'toolbar-collapse',
                            leftSideCollapsed && 'active',
                        )}
                        onClick={_ => setLeftSideCollapsed(prev => !leftSideCollapsed)}
                    ></div>
                    <div className="nitro-icon icon-habbo"></div>
                    <div className="nitro-icon icon-rooms"></div>
                    <div
                        className="nitro-icon icon-progression"
                        onClick={_ => toggleMenu('progression')}
                    ></div>
                    <div className="nitro-icon icon-catalog"></div>
                    <div className="nitro-icon icon-builders-club"></div>
                    <div className="nitro-icon icon-inventory"></div>
                    <div
                        className="nitro-icon icon-me-circle avatar-image"
                        onClick={_ => toggleMenu('me')}
                    >
                        <AvatarImage
                            figure={userFigure}
                            gender={userGender as AvatarGenderType}
                            direction={3}
                        />
                    </div>
                    <div className="nitro-icon icon-wired"></div>
                    <div className="nitro-icon icon-camera"></div>
                </div>
                <div className="toolbar-right">
                    <div className="nitro-icon icon-friendall"></div>
                    <div className="nitro-icon icon-friendsearch"></div>
                    <div
                        className={cn(
                            'toolbar-collapse',
                            rightSideCollapsed && 'active',
                        )}
                        onClick={_ => setRightSideCollapsed(!rightSideCollapsed)}
                    ></div>
                </div>
            </div>
        </>
    );
};
