
import { useFriendsContext, useTranslation } from "#base/context";
import { useSystemActions } from "#base/context/system";
import { Accordion, cn, Frame } from "#base/theme";


export const FriendListView = () => {
    const { toggleWindow } = useSystemActions();
    const { activeTab, setActiveTab, tooltip } = useFriendsContext();
    const t = useTranslation();

    return (
        <>
            <Frame variant="0" id="friendlist" className={cn('w-57.5 min-h-26.75 leading-none', activeTab ? 'h-87.5' : 'h-fit')} contentClassName="px-0! pt-0! -mt-px" caption={t('friendlist.friends')} onClose={() => toggleWindow('friendlist')}>
                <Accordion collapsible value={activeTab} onValueChange={setActiveTab} className={cn('text-black border-t border-black bg-white -mx-0.5', activeTab ? 'flex-1 min-h-0' : 'h-fit')}>
                    {/* <FriendListFriends value={friendTabs.friends} />
                    <FriendListRequests value={friendTabs.requests} />
                    <FriendListSearch value={friendTabs.search} /> */}
                </Accordion>
                <div className="w-full h-7 shrink-0 flex justify-end items-center pt-2 pr-8">
                    <span className="w-full ml-2 text-end text-white text-[0.655rem] font-aa text-nowrap overflow-hidden">
                        {tooltip}
                    </span>
                </div>
            </Frame>
        </>
    );
}