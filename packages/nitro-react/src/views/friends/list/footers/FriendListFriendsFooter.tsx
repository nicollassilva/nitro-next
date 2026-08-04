import { KeyboardEvent as ReactKeyboardEvent } from "react";

import { Border, Button, NitroIcon } from "#base/theme";

interface FriendListFriendsFooterProps {
    showSearch: boolean;
    onSearchToggled: (showSearch: boolean) => void;
    searchDraft: string;
    onSearchDraftChanged: (value: string) => void;
    onSearchSubmitted: () => void;
    onTooltipChanged: (tooltip: string) => void;
}

export const FriendListFriendsFooter = (props: FriendListFriendsFooterProps) => {
    const { showSearch, onSearchToggled, searchDraft, onSearchDraftChanged, onSearchSubmitted, onTooltipChanged } = props;

    const tooltip = (tooltip: string) => ({
        onMouseEnter: () => onTooltipChanged(tooltip),
        onMouseLeave: () => onTooltipChanged('')
    });

    const onInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;

        onSearchSubmitted();
    }

    return (
        <div className="h-10 shrink-0 px-1.5 py-1.25">
            <Border tintColor="#d8d8d8" className="h-full flex justify-center items-center px-1.25">
                <div className="flex gap-1">
                    <Button className="py-1.25! px-1.5!" { ...tooltip('friendlist.tip.invite') }>
                        <NitroIcon icon="icon-room-invite" />
                    </Button>
                    <Button className="py-1.25! px-1.5!" { ...tooltip('friendlist.tip.home') }>
                        <NitroIcon icon="icon-homepage-outline" />
                    </Button>
                </div>
                <div className="flex-1 flex gap-1 justify-end">
                    <div className="flex relative" { ...tooltip('friendlist.tip.search') }>
                        { showSearch ? <>
                            <input className="w-27 pl-0.5 pr-4.5 bg-white h-5 mt-px border border-black text-[0.75rem] text-black" type="text" value={ searchDraft } onChange={ e => onSearchDraftChanged(e.target.value) } onKeyDown={ onInputKeyDown } />
                            <NitroIcon className="absolute right-1 top-1.5 w-3! h-3! cursor-pointer" icon="icon-close-gray" onClick={ () => onSearchToggled(false) } />
                        </> : <>
                            <Button className="py-1.25! px-1.5!" onClick={ () => onSearchToggled(true) }>
                                <NitroIcon icon="icon-search-outline" />
                            </Button>
                        </> }
                    </div>
                    <Button className="py-1.25! px-1.5!" { ...tooltip('friendlist.tip.remove') }>
                        <NitroIcon icon="icon-trash-outline" />
                    </Button>
                </div>
            </Border>
        </div>
    );
}
