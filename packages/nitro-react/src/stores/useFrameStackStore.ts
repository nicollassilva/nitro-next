import { create } from 'zustand';

const BASE_FRAME_Z_INDEX = 100;

type FrameStackState = {
    topZIndex: number;
    topId: string | undefined;
    zIndexById: Record<string, number>;
};

type FrameStackActions = {
    bringToFront: (id: string) => void;
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
}));

export { BASE_FRAME_Z_INDEX };
