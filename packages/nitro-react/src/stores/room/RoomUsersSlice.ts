import type { IRoomUserData } from "@nitrodevco/nitro-api";
import type { StateCreator } from "zustand";

type State = {
    usersByRoomObjectId: Record<number, IRoomUserData>;
    userBadges: Record<number, string[]>;
}

type Actions = {
    getUserByRoomObjectId: (objectId: number) => IRoomUserData | undefined;
    updateUsers: (datas: IRoomUserData[]) => void;
    updateUser: (data: IRoomUserData) => void;
    updateUserPartial: (objectId: number, data: Partial<IRoomUserData>) => void;
    removeUser: (objectId: number) => void;
    setBadges: (webId: number, badges: string[]) => void;
};

export const RoomUsersSliceInitialState: State = {
    usersByRoomObjectId: {},
    userBadges: {}
};

export type RoomUsersSlice = State & Actions;

export const createRoomUsersSlice: StateCreator<RoomUsersSlice, [], [], RoomUsersSlice> = (set, get, store) => ({
    ...RoomUsersSliceInitialState,
    getUserByRoomObjectId: (objectId: number) => {
        return get().usersByRoomObjectId[objectId];
    },
    updateUsers: (datas: IRoomUserData[]) => set(x => {
        const usersByRoomObjectId = { ...x.usersByRoomObjectId };

        for (const data of datas) usersByRoomObjectId[data.objectId] = data;

        return { usersByRoomObjectId };
    }),
    updateUser: (data: IRoomUserData) => set(x => ({
        usersByRoomObjectId: { ...x.usersByRoomObjectId, [data.objectId]: data }
    })),
    updateUserPartial: (objectId: number, data: Partial<IRoomUserData>) => set(x => ({
        usersByRoomObjectId: { ...x.usersByRoomObjectId, [objectId]: { ...x.usersByRoomObjectId[objectId], ...data } }
    })),
    removeUser: (objectId: number) => set(x => {
        const { [objectId]: _, ...rest } = x.usersByRoomObjectId;

        return { usersByRoomObjectId: rest };
    }),
    setBadges: (webId: number, badges: string[]) => set(x => ({
        userBadges: { ...x.userBadges, [webId]: badges }
    }))
});