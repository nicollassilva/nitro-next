import type { UserStore } from "../UserStore";

export const selectClubLevel = (state: UserStore) => state.clubLevel;

export const selectOwnUserId = (state: UserStore) => state.userId;

export const selectSecurityLevel = (state: UserStore) => state.securityLevel;