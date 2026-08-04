import { useState } from "react";

import { useLocalizationStore } from "#base/stores";
import { cn, Frame } from "#base/theme";

import { FriendListFriends } from "./FriendListFriends";
import { FriendListRequests } from "./FriendListRequests";
import { FriendListSearch } from "./FriendListSearch";

export const FriendListView = () => {
    const [activeTab, setActiveTab] = useState<string>('friends');

    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    const onTabChanged = (tabName: string) => {
        setActiveTab(prevTab => prevTab === tabName ? '' : tabName);
    }

    return (
        <>
            <Frame variant="0" id="friendlist" className={ cn('w-57.5 min-h-26.25', activeTab ? 'h-87.5' : 'h-fit') } contentClassName="px-0! pt-0! -mt-px" caption={ getLocalizationValue('friendlist.friends') }>
                <div className={cn('flex flex-col text-black border-t border-black bg-white -ml-0.5 w-[calc(100%+4px)]', activeTab ? 'h-[calc(100%-30px)]' : 'h-fit')}>
                    <FriendListFriends activeTab={ activeTab } onTabChanged={ onTabChanged } />
                    <FriendListRequests activeTab={ activeTab } onTabChanged={ onTabChanged } />
                    <FriendListSearch activeTab={ activeTab } onTabChanged={ onTabChanged } />
                </div>
                <div className="w-full h-7.5 flex justify-end items-center pt-2 pr-8">
                    <span className="w-full ml-2 text-end text-white text-[0.655rem] font-aa text-nowrap overflow-hidden">
                        Enviar mensagem instantânea
                    </span>
                </div>
            </Frame>
        </>
    );
}