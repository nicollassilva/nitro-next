
import { friendTabs, useFriendsContext, useSystemContext } from "#base/context";
import { useLocalizationStore } from "#base/stores";
import { Accordion, cn, Frame } from "#base/theme";

import { FriendListFriends } from "./tabs/FriendListFriends";
import { FriendListRequests } from "./tabs/FriendListRequests";
import { FriendListSearch } from "./tabs/FriendListSearch";

export const FriendListView = () => {
    const { activeTab, setActiveTab, tooltip } = useFriendsContext();
    const { isWindowVisible, toggleWindow } = useSystemContext();

    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    if(!isWindowVisible('friendlist')) return null;

    return (
        <>
            <Frame variant="0" id="friendlist" className={ cn('w-57.5 min-h-26.75 leading-none', activeTab ? 'h-87.5' : 'h-fit') } contentClassName="px-0! pt-0! -mt-px" caption={ getLocalizationValue('friendlist.friends') } onClose={ () => toggleWindow('friendlist') }>
                <Accordion collapsible value={ activeTab } onValueChange={ setActiveTab } className={cn('text-black border-t border-black bg-white -mx-0.5', activeTab ? 'flex-1 min-h-0' : 'h-fit')}>
                    <FriendListFriends value={ friendTabs.friends } />
                    <FriendListRequests value={ friendTabs.requests } />
                    <FriendListSearch value={ friendTabs.search } />
                </Accordion>
                <div className="w-full h-7 shrink-0 flex justify-end items-center pt-2 pr-8">
                    <span className="w-full ml-2 text-end text-white text-[0.655rem] font-aa text-nowrap overflow-hidden">
                        { tooltip }
                    </span>
                </div>
            </Frame>
        </>
    );
}