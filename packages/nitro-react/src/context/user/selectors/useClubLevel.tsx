import { useUserContext } from "#base/context";
import { selectClubLevel } from "#base/stores";

export const useClubLevel = () => useUserContext(selectClubLevel);