import { UserStore } from "../UserStore";

export const selectFriends = (state: UserStore) => state.friends;