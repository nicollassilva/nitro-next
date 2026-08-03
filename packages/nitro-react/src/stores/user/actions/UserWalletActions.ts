import type { UserStore } from "../UserStore";

export type UserWalletActions = {
    setCredits: UserStore['setCredits'];
    setEmeralds: UserStore['setEmeralds'];
    setSilver: UserStore['setSilver'];
    setActivityPoints: UserStore['setActivityPoints'];
}

export const extractUserWalletActions = (store: UserStore) => ({
    setCredits: store.setCredits,
    setEmeralds: store.setEmeralds,
    setSilver: store.setSilver,
    setActivityPoints: store.setActivityPoints
});