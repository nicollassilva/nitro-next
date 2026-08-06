import { IMessengerSearchResult } from "@nitrodevco/nitro-shared";

import { useLocalizationStore } from "#base/stores";
import { Accordion, ScrollArea } from "#base/theme";

import { FriendListGroup } from "../components/FriendListGroup";
import { FriendListTab } from "../components/FriendListTab";
import { FriendListSearchFooter } from "../footers/FriendListSearchFooter";
import { FriendListSearchItem } from "../items/FriendListSearchItem";

interface FriendListSearchProps {
    value: string;
}

interface FriendListSearchGroupData {
    value: string;
    caption: string;
    emptyCaption: string;
    results: IMessengerSearchResult[];
}

export const FriendListSearch = (props: FriendListSearchProps) => {
    const getLocalizationValueParams = useLocalizationStore(x => x.getLocalizationValueParams);
    
    const groups = [
        {
            value: 'friends',
            caption: 'friendlist.search.friendscaption',
            emptyCaption: 'friendlist.search.nofriendsfound',
            results: []
        },
        {
            value: 'others',
            caption: 'friendlist.search.otherscaption',
            emptyCaption: 'friendlist.search.noothersfound',
            results: []
        }
    ] as FriendListSearchGroupData[];

    const getCaption = (group: FriendListSearchGroupData) => group.results.length < 1 ? group.emptyCaption : group.caption

    return (
        <FriendListTab
            darkHeader
            value={ props.value }
            caption="people.search.title"
            triggerClassName="from-[#6b6b6b] to-[#555555]"
            contentClassName="bg-[#b6b6b6]"
        >
            <ScrollArea
                className="flex-1 min-h-0 p-1 pb-0 gap-1 text-[0.68rem]"
                contentClassName="flex flex-col [&>*:nth-child(odd)]:bg-[#9f9f9f]"
            >
                <Accordion type="multiple" unwrapped alwaysOpen>
                    { groups.map(group => (
                        <FriendListGroup key={ group.value } value={ group.value } caption={ getLocalizationValueParams(getCaption(group), ['cnt'], [String(group.results.length)]) } showArrows={ false }>
                            { group.results.map((result: IMessengerSearchResult) => <FriendListSearchItem key={ result.playerId } result={ result } /> ) }
                        </FriendListGroup>
                    )) }
                </Accordion>
            </ScrollArea>
            <FriendListSearchFooter />
        </FriendListTab>
    );
}
