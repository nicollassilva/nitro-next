import { useState } from "react";

import { useLocalizationStore } from "#base/stores";
import { cn, Frame } from "#base/theme";

import { FriendListFriends } from "./FriendListFriends";
import { FriendListRequests } from "./FriendListRequests";
import { FriendListSearch } from "./FriendListSearch";

export const FriendListView = () => {
    const [activeTab, setActiveTab] = useState<string>('friends');
    const [tooltip, setTooltip] = useState<string>('');

    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    const onTabChanged = (tabName: string) => {
        setActiveTab(prevTab => prevTab === tabName ? '' : tabName);
    }

    const onTooltipChanged = (value: string) => {
        if(value === tooltip) return;

        if(value.length < 1) {
            setTooltip('');
            return;
        }

        setTooltip(getLocalizationValue(value))
    }

    return (
        <>
            <Frame variant="0" id="friendlist" className={ cn('w-57.5 min-h-26.75', activeTab ? 'h-87.5' : 'h-fit') } contentClassName="px-0! pt-0! -mt-px" caption={ getLocalizationValue('friendlist.friends') }>
                <div className={cn('flex flex-col text-black border-t border-black bg-white -mx-0.5', activeTab ? 'flex-1 min-h-0' : 'h-fit')}>
                    <FriendListFriends activeTab={ activeTab } onTabChanged={ onTabChanged } onTooltipChanged={ onTooltipChanged } />
                    <FriendListRequests activeTab={ activeTab } onTabChanged={ onTabChanged } onTooltipChanged={ onTooltipChanged } />
                    <FriendListSearch activeTab={ activeTab } onTabChanged={ onTabChanged } onTooltipChanged={ onTooltipChanged } />
                </div>
                <div className="w-full h-7 shrink-0 flex justify-end items-center pt-2 pr-8">
                    <span className="w-full ml-2 text-end text-white text-[0.655rem] font-aa text-nowrap overflow-hidden">
                        { tooltip }
                    </span>
                </div>
            </Frame>
        </>
    );
}