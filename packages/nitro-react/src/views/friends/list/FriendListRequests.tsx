import { HTMLAttributes } from "react";

import { useLocalizationStore } from "#base/stores";
import { Border, NitroIcon, ScrollArea } from "#base/theme";

interface FriendListRequestsProps extends HTMLAttributes<HTMLDivElement> {
    activeTab: string;
    onTabChanged: (tabName: string) => void;
    onTooltipChanged: (tooltip: string) => void;
}

export const FriendListRequests = (props: FriendListRequestsProps) => {
    const tabName = 'requests';

    const { activeTab, onTabChanged } = props;

    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    const isActive = () => activeTab === tabName;

    return (
        <>
            <div className="h-4.5 shrink-0 bg-linear-to-b from-[#ff9302] from-50% to-[#ea8000] to-50% border-b flex justify-start items-center pt-px px-2 gap-1.5" onClick={ () => onTabChanged(tabName) }>
                <span className="text-white text-[0.68rem]">{ getLocalizationValue('friendlist.tab.friendrequests') }</span>
                <NitroIcon className="brightness-0 invert mb-px" icon={ isActive() ? 'icon-arrow-down-black' : 'icon-arrow-right-black' } />
            </div>
            { isActive() && <>
                <div className="flex flex-col flex-1 overflow-hidden border-b">
                    <ScrollArea className="flex-1 min-h-0 p-1 pb-0 gap-1" contentClassName="flex flex-col [&>*:nth-child(odd)]:bg-[#eeeeee] [&>*:nth-child(even)]:bg-white">
                        area
                    </ScrollArea>
                    <div className="h-10 shrink-0 px-1.5 py-1.25">
                        <Border tintColor="#d8d8d8" className="h-full flex justify-center items-center px-1.25"></Border>
                    </div>
                </div>
            </> }
        </>
    );
}
