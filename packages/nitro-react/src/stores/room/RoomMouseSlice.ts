import type { RoomObjectCategoryEnum } from "@nitrodevco/nitro-api";
import type { StateCreator } from "zustand";

type State = {
    eventIds: Map<RoomObjectCategoryEnum, Map<string, number>>;
    cursorOwners: string[];
    hasCursorUpdate: boolean;
}

type Actions = {
    getMouseEventId: (category: RoomObjectCategoryEnum, type: string) => number | undefined;
    setMouseEventId: (category: RoomObjectCategoryEnum, type: string, eventId: number) => void;
    addCursorOwner: (objectId: number, category: RoomObjectCategoryEnum) => void;
    removeCursorOwner: (objectId: number, category: RoomObjectCategoryEnum) => void;
    hasAndResetCursorUpdate: () => boolean;
    hasCursorOwners: () => boolean;
};

export const RoomMouseSliceInitialState: State = {
    eventIds: new Map(),
    cursorOwners: [],
    hasCursorUpdate: false
};

export type RoomMouseSlice = State & Actions;

export const createRoomMouseSlice: StateCreator<RoomMouseSlice, [], [], RoomMouseSlice> = (set, get, store) => ({
    ...RoomMouseSliceInitialState,
    // Never share the module-level `eventIds` Map: give every store instance its own.
    eventIds: new Map(),
    getMouseEventId: (category: RoomObjectCategoryEnum, type: string) => {
        return get().eventIds.get(category)?.get(type);
    },
    setMouseEventId: (category: RoomObjectCategoryEnum, type: string, eventId: number) => {
        set(x => {
            const eventIds = new Map(x.eventIds);
            const inner = new Map(eventIds.get(category));

            inner.set(type, eventId);
            eventIds.set(category, inner);

            return { eventIds };
        });
    },
    addCursorOwner: (objectId: number, category: RoomObjectCategoryEnum) => {
        const key = `${category}_${objectId}`;

        set(x => {
            if (x.cursorOwners.indexOf(key) >= 0) return x;

            return { cursorOwners: [...x.cursorOwners, key], hasCursorUpdate: true };
        });
    },
    removeCursorOwner: (objectId: number, category: RoomObjectCategoryEnum) => {
        const key = `${category}_${objectId}`;

        set(x => {
            const index = x.cursorOwners.indexOf(key);

            if (index === -1) return x;

            const cursorOwners = [...x.cursorOwners];

            cursorOwners.splice(index, 1);

            return { cursorOwners, hasCursorUpdate: true };
        });
    },
    hasAndResetCursorUpdate: () => {
        if (!get().hasCursorUpdate) return false;

        set({ hasCursorUpdate: false });

        return true;
    },
    hasCursorOwners: () => get().cursorOwners.length > 0
});