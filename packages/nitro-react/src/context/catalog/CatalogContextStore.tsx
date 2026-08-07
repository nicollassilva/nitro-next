import { createStore } from 'zustand';

type State = {
}

type Actions = {
}

const initialState: State = {
};

export type CatalogContextStore = State & Actions;

export const createCatalogContextStore = () => createStore<CatalogContextStore>()((set, get, store) => ({
    ...initialState,
}));