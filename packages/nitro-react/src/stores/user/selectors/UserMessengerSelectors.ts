import { UserStore } from "../UserStore";

export const selectFriends = (state: UserStore) => state.friends;

export const selectRequests = (state: UserStore) => state.requests;
