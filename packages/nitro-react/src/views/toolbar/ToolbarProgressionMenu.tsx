import { useLocalizationStore } from '#base/stores';
import { forwardRef } from 'react';

export const ToolbarProgressionMenu = forwardRef<HTMLDivElement>((props, ref) => {
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    return (
        <div className="toolbar-menu" ref={ref}>
            <div className="toolbar-menu-button">
                <div className="nitro-icon icon-progression-daily-tasks"></div>
                <span>{getLocalizationValue('widget.progmenu.dailytasks')}</span>
            </div>
            <div className="toolbar-menu-button">
                <div className="nitro-icon icon-progression-tasks"></div>
                <span>{getLocalizationValue('widget.progmenu.quests')}</span>
            </div>
            <div className="toolbar-menu-button">
                <div className="nitro-icon icon-progression-achievements"></div>
                <span>{getLocalizationValue('widget.progmenu.achievements')}</span>
            </div>
            <div className="toolbar-menu-button">
                <div className="nitro-icon icon-progression-leaderboard"></div>
                <span>{getLocalizationValue('widget.progmenu.leaderboards')}</span>
            </div>
            <div className="toolbar-menu-button">
                <div className="nitro-icon icon-progression-introduction"></div>
                <span>{getLocalizationValue('widget.progmenu.introduction')}</span>
            </div>
        </div>
    );
});
