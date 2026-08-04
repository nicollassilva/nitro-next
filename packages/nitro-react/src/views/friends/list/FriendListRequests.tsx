import { HTMLAttributes } from "react";

import { useLocalizationStore } from "#base/stores";
import { NitroIcon } from "#base/theme";

interface FriendListRequestsProps extends HTMLAttributes<HTMLDivElement> {
    activeTab: string;
    onTabChanged: (tabName: string) => void;
}

export const FriendListRequests = (props: FriendListRequestsProps) => {
    const tabName = 'requests';

    const { activeTab, onTabChanged } = props;

    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    const isActive = () => activeTab === tabName;

    return (
        <>
            <div className="w-full h-4.5 shrink-0 bg-linear-to-b from-[#ff9302] from-50% to-[#ea8000] to-50% border-b flex justify-start items-center pt-px px-2 gap-1.5" onClick={ () => onTabChanged(tabName) }>
                <span className="text-white text-[0.68rem]">{ getLocalizationValue('friendlist.tab.friendrequests') }</span>
                <NitroIcon className="brightness-0 invert mb-px" icon={ isActive() ? 'icon-arrow-down-small' : 'icon-arrow-right-small' } />
            </div>
            { isActive() && <>
                <div className="w-full flex-1 min-h-0 overflow-y-auto border-b">

                </div>
            </> }
        </>
    );
}
