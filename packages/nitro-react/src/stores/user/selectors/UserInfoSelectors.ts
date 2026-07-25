import type { UserStore } from "../UserStore";

export const selectOwnClubLevel = (state: UserStore) => state.clubLevel;

export const selectOwnUserId = (state: UserStore) => state.userId;

export const selectOwnSecurityLevel = (state: UserStore) => state.securityLevel;

export const selectIsSystemShutdown = (state: UserStore) => state.systemShutdown;