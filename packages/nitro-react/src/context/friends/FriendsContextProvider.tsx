import type { ReactNode } from 'react';
import { useState } from 'react';

import { useLocalizationStore } from '#base/stores';

import { FriendsContext, friendTabs } from './FriendsContext';

type ProviderProps = {
    children: ReactNode;
}

export const FriendsContextProvider = ({ children }: ProviderProps) => {
    const [activeTab, setActiveTab] = useState<string>(friendTabs.friends);
    const [tooltip, setTooltip] = useState<string>('');

    const [showListSearchInput, setShowListSearchInput] = useState<boolean>(false);

    const [filterValue, setFilterValue] = useState<string>('');
    const [listSearchValue, setListSearchValue] = useState<string>('');

    const [selectedFriendsIds, setSelectedFriendsIds] = useState<number[]>([]);
    const [relationshipDropdownId, setRelationshipDropdownId] = useState<number>(0);
    
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    const updateTooltip = (value: string) => {
        if(value === tooltip) return;

        if(value.length < 1) {
            setTooltip('');
            return;
        }

        setTooltip(getLocalizationValue(value))
    }

    const toggleListSearchInput = (showSearch: boolean) => {
        setShowListSearchInput(showSearch);

        if (showSearch) return;

        setListSearchValue('');
        setFilterValue('');
    }

    const toggleSelectedFriendId = (friendId: number) => {
        setSelectedFriendsIds(x => {
            const results = [...x];

            const index = results.indexOf(friendId);

            if (index >= 0) results.splice(index, 1);
            else results.push(friendId);

            return results;
        });
    }

    const isFriendSelected = (friendId: number) => {
        return selectedFriendsIds.indexOf(friendId) >= 0;
    }

    const tooltipHandlers = (tooltip: string) => ({
        onMouseEnter: () => updateTooltip(tooltip),
        onMouseLeave: () => updateTooltip('')
    });

    return (
        <FriendsContext value={{ activeTab, setActiveTab, tooltip, updateTooltip, showListSearchInput, toggleListSearchInput, listSearchValue, setListSearchValue, filterValue, setFilterValue, selectedFriendsIds, setSelectedFriendsIds, toggleSelectedFriendId, isFriendSelected, relationshipDropdownId, setRelationshipDropdownId, tooltipHandlers }}>
            {children}
        </FriendsContext>
    );
};
