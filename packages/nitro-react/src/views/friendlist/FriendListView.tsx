
import { useFriendsSelectors, useTranslation } from "#base/context";
import { useSystemActions, useWindowParams } from "#base/context/system";
import { Accordion, cn, Frame } from "#base/theme";

import { FriendListFriends } from "./FriendListFriends";
import { FriendListRequests } from "./FriendListRequests";
import { FriendListSearch } from "./FriendListSearch";

export type FriendListViewWindowParams = { tab?: '' | 'friends' | 'requests' | 'search' };

export const FriendListView = () => {
    const { tab: activeTab = 'friends' } = useWindowParams('friendlist');

    const { toggleWindow, updateWindowParams } = useSystemActions();
    const { tooltip } = useFriendsSelectors();

    const t = useTranslation();

    const setActiveTab = (tab: string) => {
        updateWindowParams('friendlist', { tab: tab as FriendListViewWindowParams['tab'] });
    }

    return (
        <Frame variant="0" id="friendlist" className={cn('w-57.5 min-h-26.75 leading-none', activeTab ? 'h-87.5' : 'h-fit')} contentClassName="px-0! pt-0! -mt-px" caption={t('friendlist.friends')} onClose={() => toggleWindow('friendlist')}>
            <Accordion collapsible value={activeTab} onValueChange={setActiveTab} className={cn('text-black border-t border-black bg-white -mx-0.5', activeTab ? 'flex-1 min-h-0' : 'h-fit')}>
                <FriendListFriends value="friends" />
                <FriendListRequests value="requests" />
                <FriendListSearch value="search" />
            </Accordion>
            <div className="w-full h-5 shrink-0 flex justify-end items-center pt-2 pr-8">
                <span className=" text-white text-[0.655rem] font-aa text-nowrap overflow-hidden">
                    {t(tooltip)}
                </span>
            </div>
        </Frame>
    );
}
