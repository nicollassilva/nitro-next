import { useUserContext } from "#base/context";
import { selectOwnClubLevel } from "#base/stores";

export const useOwnClubLevel = () => useUserContext(selectOwnClubLevel);