import { create } from 'zustand';

const BASE_FRAME_Z_INDEX = 100;

type FrameStackState = {
    topZIndex: number;
    topId: string | undefined;
    zIndexById: Record<string, number>;
};

type FrameStackActions = {
    bringToFront: (id: string) => void;
    releaseFrame: (id: string) => void;
};

export const useFrameStackStore = create<FrameStackState & FrameStackActions>((set, get) => ({
    topZIndex: BASE_FRAME_Z_INDEX,
    topId: undefined,
    zIndexById: {},
    bringToFront: (id: string) => {
        if (get().topId === id) return;

        set((state) => {
            const nextZIndex = state.topZIndex + 1;

            return {
                topZIndex: nextZIndex,
                topId: id,
                zIndexById: { ...state.zIndexById, [id]: nextZIndex },
            };
        });
    },
    releaseFrame: (id: string) => {
        set((state) => {
            if (!(id in state.zIndexById)) return state;

            const zIndexById = { ...state.zIndexById };

            delete zIndexById[id];

            // Reset the counter once every frame is gone so it doesn't climb forever.
            const isEmpty = Object.keys(zIndexById).length === 0;

            return {
                zIndexById,
                topId: state.topId === id ? undefined : state.topId,
                topZIndex: isEmpty ? BASE_FRAME_Z_INDEX : state.topZIndex,
            };
        });
    },
}));

export { BASE_FRAME_Z_INDEX };
