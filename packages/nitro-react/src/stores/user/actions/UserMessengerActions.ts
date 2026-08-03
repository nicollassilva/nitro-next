import type { UserStore } from "../UserStore";

export type UserMessengerActions = {
    setLimits: UserStore['setLimits'];
    setFriendCategories: UserStore['setFriendCategories'];
    processFriends: UserStore['processFriends'];
    processFriendUpdates: UserStore['processFriendUpdates'];
}

export const extractUserMessengerActions = (store: UserStore) => ({
    setLimits: store.setLimits,
    setFriendCategories: store.setFriendCategories,
    processFriends: store.processFriends,
    processFriendUpdates: store.processFriendUpdates
});