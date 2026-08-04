import { HTMLAttributes } from "react";

import { useLocalizationStore } from "#base/stores";
import { NitroIcon } from "#base/theme";

interface FriendListFriendsProps extends HTMLAttributes<HTMLDivElement> {
    activeTab: string;
    onTabChanged: (tabName: string) => void;
}

export const FriendListFriends = (props: FriendListFriendsProps) => {
    const tabName = 'friends';

    const { activeTab, onTabChanged } = props;

    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    const isActive = () => activeTab === tabName;

    return (
        <>
            <div className="w-full h-4.5 shrink-0 bg-linear-to-b from-[#8adaff] from-50% to-[#59bfff] to-50% border-b flex justify-start items-center pt-px px-2 gap-1.5" onClick={ () => onTabChanged(tabName) }>
                <span className="text-black text-[0.68rem]">{ getLocalizationValue('friendlist.friends') }</span>
                <NitroIcon className="mb-px" icon={ isActive() ? 'icon-arrow-down-small' : 'icon-arrow-right-small' } />
            </div>
            { isActive() && <>
                <div className="w-full flex flex-col flex-1 min-h-0 overflow-hidden border-b">
                    <div className="flex-1 min-h-0 overflow-y-auto bg-red-300">
                        <p>a</p>
                    </div>
                    <div className="h-10 shrink-0 bg-red-400">a</div>
                </div>
            </> }
        </>
    );
}