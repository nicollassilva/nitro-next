import type { UserStore } from "../UserStore";

export type UserMessengerActions = {
    setFriendLimits: UserStore['setFriendLimits'];
    setFriendCategories: UserStore['setFriendCategories'];
    processFriends: UserStore['processFriends'];
    processFriendUpdates: UserStore['processFriendUpdates'];
    processFriendRequests: UserStore['processFriendRequests'];
}

export const extractUserMessengerActions = (store: UserStore) => ({
    setFriendLimits: store.setFriendLimits,
    setFriendCategories: store.setFriendCategories,
    processFriends: store.processFriends,
    processFriendUpdates: store.processFriendUpdates,
    processFriendRequests: store.processFriendRequests
});