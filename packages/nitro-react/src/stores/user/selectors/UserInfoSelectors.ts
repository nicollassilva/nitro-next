import type { UserStore } from "../UserStore";

export const selectOwnClubLevel = (state: UserStore) => state.clubLevel;

export const selectOwnUserId = (state: UserStore) => state.userId;

export const selectOwnSecurityLevel = (state: UserStore) => state.securityLevel;

export const selectOwnIsAmbassador = (state: UserStore) => state.isAmbassador;

export const selectIsSystemShutdown = (state: UserStore) => state.systemShutdown;

export const selectOwnRespectData = (state: UserStore) => ({
    respectTotal: state.respectTotal,
    respectLeft: state.respectLeft,
    petRespectLeft: state.petRespectLeft
});