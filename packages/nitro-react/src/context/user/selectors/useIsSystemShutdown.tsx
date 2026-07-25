import { useUserContext } from "#base/context";
import { selectIsSystemShutdown } from "#base/stores";

export const useIsSystemShutdown = () => useUserContext(selectIsSystemShutdown);