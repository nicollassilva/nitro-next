import { HTMLAttributes, useState } from "react";

import { useOfflineFriendsSelector, useOnlineFriendsSelector } from "#base/context/user";
import { useLocalizationStore } from "#base/stores";
import { Border, Button, NitroIcon, ScrollArea } from "#base/theme";

interface FriendListFriendsProps extends HTMLAttributes<HTMLDivElement> {
    activeTab: string;
    onTabChanged: (tabName: string) => void;
    onTooltipChanged: (tooltip: string) => void;
}

export const FriendListFriends = (props: FriendListFriendsProps) => {
    const tabName = 'friends';

    const [onlineFriends, offlineFriends] = [useOnlineFriendsSelector(), useOfflineFriendsSelector()];

    const { activeTab, onTabChanged, onTooltipChanged } = props;

    const [showInput, setShowInput] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');

    const [showOnlineFriends, setShowOnlineFriends] = useState<boolean>(true);
    const [showOfflineFriends, setShowOfflineFriends] = useState<boolean>(false);

    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    const isActive = () => activeTab === tabName;

    const tooltip = (tooltip: string) => ({
        onMouseEnter: () => onTooltipChanged(tooltip),
        onMouseLeave: () => onTooltipChanged('')
    });

    const visibleOnlineFriends = showOnlineFriends ? onlineFriends : [];
    const visibleOfflineFriends = showOfflineFriends ? offlineFriends : [];

    return (
        <>
            <div className="h-4.5 shrink-0 bg-linear-to-b from-[#8adaff] from-50% to-[#59bfff] to-50% border-b flex justify-start items-center pt-px px-2 gap-1.5" onClick={ () => onTabChanged(tabName) }>
                <span className="text-black text-[0.68rem]">{ getLocalizationValue('friendlist.friends') }</span>
                <NitroIcon className="mb-px" icon={ isActive() ? 'icon-arrow-down-black' : 'icon-arrow-right-black' } />
            </div>
            { isActive() && <>
                <div className="flex flex-col flex-1 overflow-hidden border-b">
                    <ScrollArea className="flex-1 min-h-0 p-1 pb-0 gap-1 text-[0.68rem]" contentClassName="flex flex-col [&>*:nth-child(odd)]:bg-[#eeeeee] [&>*:nth-child(even)]:bg-white">
                        <span className="cursor-pointer font-bold px-1 flex gap-1 items-center py-0.5" onClick={ () => setShowOnlineFriends(prev => !prev) }>
                            { getLocalizationValue('friendlist.friends') } ({ onlineFriends.length })
                            <NitroIcon className="mb-px" icon={ showOnlineFriends ? 'icon-arrow-down-black' : 'icon-arrow-right-black' } />
                        </span>
                        { visibleOnlineFriends.map(friend => (
                            <div key={ friend.playerId } className="px-1 py-0.5">{ friend.name }</div>
                        )) }
                        <span className="cursor-pointer font-bold px-1 flex gap-1 items-center py-0.5" onClick={ () => setShowOfflineFriends(prev => !prev) }>
                            { getLocalizationValue('friendlist.friends.offlinecaption') } ({ offlineFriends.length })
                            <NitroIcon className="mb-px" icon={ showOfflineFriends ? 'icon-arrow-down-black' : 'icon-arrow-right-black' } />
                        </span>
                        { visibleOfflineFriends.map(friend => (
                            <div key={ friend.playerId } className="px-1 py-0.5">{ friend.name }</div>
                        )) }
                    </ScrollArea>
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
                                    { showInput ? <>
                                        <input className="w-27 pl-0.5 pr-4.5 bg-white h-5 mt-px border border-black text-[0.75rem] text-black" type="text" value={ searchValue } onChange={ e => setSearchValue(e.target.value) } />
                                        <NitroIcon className="absolute right-1 top-1.5 w-3! h-3! cursor-pointer" icon="icon-close-gray" onClick={ () => setShowInput(false) } />
                                    </> : <>
                                        <Button className="py-1.25! px-1.5!" onClick={ () => setShowInput(true) }>
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
                </div>
            </> }
        </>
    );
}