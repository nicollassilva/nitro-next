import { useContext } from 'react';

import { FriendsContext } from './FriendsContext';

export const useFriendsContext = () => {
    const ctx = useContext(FriendsContext);

    if (!ctx) throw new Error('useFriendsContext must be used within FriendsContextProvider');

    return ctx;
}
