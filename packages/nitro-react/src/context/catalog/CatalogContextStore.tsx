import { ICatalogNode } from '@nitrodevco/nitro-shared';
import { createStore } from 'zustand';

type State = {
    catalogType: string;
    rootNode: ICatalogNode | undefined;
    offersToNodes: Record<number, ICatalogNode[]>;
    activeNodes: ICatalogNode[];
    isBusy: boolean;
    activePageId: number;
}

type Actions = {
    setRootNode: (rootNode: ICatalogNode) => void;
    setOffersToNodes: (offersToNodes: Record<number, ICatalogNode[]>) => void;
    setActiveNodes: (activeNodes: ICatalogNode[]) => void;
    setIsBusy: (isBusy: boolean) => void;
    setActivePageId: (activePageId: number) => void;
}

const initialState: State = {
    catalogType: '',
    rootNode: undefined,
    offersToNodes: {},
    activeNodes: [],
    isBusy: false,
    activePageId: -1
};

export type CatalogContextStore = State & Actions;

export const createCatalogContextStore = (catalogType: string) => createStore<CatalogContextStore>()((set, get, store) => ({
    ...initialState,
    catalogType,
    setRootNode: (rootNode: ICatalogNode) => set({ rootNode }),
    setOffersToNodes: (offersToNodes: Record<number, ICatalogNode[]>) => set({ offersToNodes }),
    setActiveNodes: (activeNodes: ICatalogNode[]) => set({ activeNodes }),
    setIsBusy: (isBusy: boolean) => set({ isBusy }),
    setActivePageId: (activePageId: number) => set({ activePageId }),
}));