import { useLocalizationStore } from '#base/stores';
import { forwardRef } from 'react';

export const ToolbarMeMenu = forwardRef<HTMLDivElement>((props, ref) => {
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    return (
        <div className="toolbar-menu" ref={ref}>
            <div className="toolbar-menu-button">
                <div className="nitro-icon icon-me-profile"></div>
                <span>{getLocalizationValue('widget.memenu.profile')}</span>
            </div>
            <div className="toolbar-menu-button">
                <div className="nitro-icon icon-me-rooms"></div>
                <span>{getLocalizationValue('widget.memenu.myrooms')}</span>
            </div>
            <div className="toolbar-menu-button">
                <div className="nitro-icon icon-me-clothing"></div>
                <span>{getLocalizationValue('widget.memenu.myclothes')}</span>
            </div>
            <div className="toolbar-menu-button">
                <div className="nitro-icon icon-me-forums"></div>
                <span>{getLocalizationValue('widget.memenu.forums')}</span>
            </div>
            <div className="toolbar-menu-button">
                <div className="nitro-icon icon-me-collectibles"></div>
                <span>{getLocalizationValue('memenu.collectibles')}</span>
            </div>
        </div>
    );
});
