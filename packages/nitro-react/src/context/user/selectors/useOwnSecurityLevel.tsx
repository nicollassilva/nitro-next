import { useUserContext } from "#base/context";
import { selectOwnSecurityLevel } from "#base/stores";

export const useOwnSecurityLevel = () => useUserContext(selectOwnSecurityLevel);