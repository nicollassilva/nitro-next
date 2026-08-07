import { KeyboardEvent as ReactKeyboardEvent } from "react";

import { useFriendsContext, useSystemContext } from "#base/context";
import { Border, Button, NitroIcon } from "#base/theme";

export const FriendListFriendsFooter = () => {
    const { listSearchValue, setListSearchValue, showListSearchInput, toggleListSearchInput, setFilterValue, selectedFriendsIds, tooltipHandlers } = useFriendsContext();
    const { toggleWindow } = useSystemContext();

    const onInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;

        setFilterValue(listSearchValue);
    }

    return (
        <div className="h-10 shrink-0 px-1.5 py-1.25">
            <Border tintColor="#d8d8d8" className="h-full flex justify-center items-center px-1.25">
                <div className="flex gap-1">
                    <Button disabled={ selectedFriendsIds.length < 1 } className="py-1.25! px-1.5!" { ...tooltipHandlers('friendlist.tip.invite') } onClick={ () => toggleWindow('friendlist_invite')}>
                        <NitroIcon icon="icon-room-invite" />
                    </Button>
                    <Button disabled={ selectedFriendsIds.length !== 1 } className="py-1.25! px-1.5!" { ...tooltipHandlers('friendlist.tip.home') }>
                        <NitroIcon icon="icon-homepage-outline" />
                    </Button>
                </div>
                <div className="flex-1 flex gap-1 justify-end">
                    <div className="flex relative" { ...tooltipHandlers('friendlist.tip.search') }>
                        { showListSearchInput ? <>
                            <input name="list_search" className="w-27 pl-0.5 pr-4.5 bg-white h-5 mt-px border border-black text-[0.75rem] text-black" type="text" value={ listSearchValue } onChange={ e => setListSearchValue(e.target.value) } onKeyDown={ onInputKeyDown } />
                            <NitroIcon className="absolute right-1 top-1.5 w-3! h-3! cursor-pointer" icon="icon-close-gray" onClick={ () => toggleListSearchInput(false) } />
                        </> : <>
                            <Button className="py-1.25! px-1.5!" onClick={ () => toggleListSearchInput(true) }>
                                <NitroIcon icon="icon-search-outline" />
                            </Button>
                        </> }
                    </div>
                    <Button disabled={ selectedFriendsIds.length < 1 } className="py-1.25! px-1.5!" { ...tooltipHandlers('friendlist.tip.remove') } onClick={ () => toggleWindow('friendlist_remove_confirmation')}>
                        <NitroIcon icon="icon-trash-outline" />
                    </Button>
                </div>
            </Border>
        </div>
    );
}
