import { forwardRef } from 'react';

import { useTranslation } from '#base/context';
import { NitroIcon } from '#base/theme';

export const ToolbarProgressionMenu = forwardRef<HTMLDivElement>((props, ref) => {
    const t = useTranslation();

    return (
        <div className="toolbar-menu" ref={ref}>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-progression-daily-tasks" />
                <span>{t('widget.progmenu.dailytasks')}</span>
            </div>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-progression-tasks" />
                <span>{t('widget.progmenu.quests')}</span>
            </div>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-progression-achievements" />
                <span>{t('widget.progmenu.achievements')}</span>
            </div>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-progression-leaderboard" />
                <span>{t('widget.progmenu.leaderboards')}</span>
            </div>
            <div className="toolbar-menu-button">
                <NitroIcon icon="icon-progression-introduction" />
                <span>{t('widget.progmenu.introduction')}</span>
            </div>
        </div>
    );
});
