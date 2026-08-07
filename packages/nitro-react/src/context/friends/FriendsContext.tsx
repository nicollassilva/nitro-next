import { createContext } from 'react';

type TooltipHandlers = {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export const friendTabs = {
    friends: 'friends',
    requests: 'requests',
    search: 'search'
} as const;

type FriendsContextStore = {
    activeTab: string;
    setActiveTab: (value: string) => void;
    tooltip: string;
    updateTooltip: (value: string) => void;
    showListSearchInput: boolean;
    toggleListSearchInput: (value: boolean) => void;
    listSearchValue: string;
    setListSearchValue: (value: string) => void;
    filterValue: string;
    setFilterValue: (value: string) => void;
    selectedFriendsIds: number[];
    setSelectedFriendsIds: (value: number[]) => void;
    toggleSelectedFriendId: (friendId: number) => void;
    isFriendSelected: (friendId: number) => boolean;
    relationshipDropdownId: number;
    setRelationshipDropdownId: (friendId: number) => void;
    tooltipHandlers: (tooltip: string) => TooltipHandlers;
}

export const FriendsContext = createContext<FriendsContextStore | undefined>(undefined);
