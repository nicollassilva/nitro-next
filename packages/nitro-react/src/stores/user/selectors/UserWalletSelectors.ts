import { UserStore } from "../UserStore";

export const selectCredits = (state: UserStore) => state.credits;

export const selectEmeralds = (state: UserStore) => state.emeralds;

export const selectSilver = (state: UserStore) => state.silver;

export const selectActivityPoints = (state: UserStore) => state.activityPoints;

export const selectCurrencyData = (state: UserStore) => ({
    credits: state.credits,
    emeralds: state.emeralds,
    silver: state.silver,
    activityPoints: state.activityPoints
});