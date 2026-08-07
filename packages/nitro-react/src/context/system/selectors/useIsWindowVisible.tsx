import { useSystemContext } from "#base/context";
import { selectVisibleWindows } from "#base/stores";

export const useIsWindowVisible = (name: string) => {
    const visibleWindows = useSystemContext(selectVisibleWindows);

    return visibleWindows.indexOf(name) >= 0;
}