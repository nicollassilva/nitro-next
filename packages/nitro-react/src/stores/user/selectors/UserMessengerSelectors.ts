import { UserStore } from "../UserStore";

export const selectFriends = (state: UserStore) => state.friends;

export const selectRequests = (state: UserStore) => state.requests;

export const selectOnlineFriends = (state: UserStore) => Object.values(state.friends).filter(x => x.isOnline);

export const selectOfflineFriends = (state: UserStore) => Object.values(state.friends).filter(x => !x.isOnline);