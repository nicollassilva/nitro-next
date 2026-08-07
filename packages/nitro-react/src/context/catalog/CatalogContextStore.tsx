import { ICatalogNode } from '@nitrodevco/nitro-shared';
import { createStore } from 'zustand';

type State = {
    catalogType: string;
    rootNode: ICatalogNode | undefined;
    offersToNodes: Record<number, ICatalogNode[]>;
    activeNodes: ICatalogNode[];
}

type Actions = {
    setRootNode: (rootNode: ICatalogNode) => void;
    setOffersToNodes: (offersToNodes: Record<number, ICatalogNode[]>) => void;
    activateNode: (targetNode: ICatalogNode) => void;
}

const initialState: State = {
    catalogType: '',
    rootNode: undefined,
    offersToNodes: {},
    activeNodes: []
};

export type CatalogContextStore = State & Actions;

export const createCatalogContextStore = (catalogType: string) => createStore<CatalogContextStore>()((set, get, store) => ({
    ...initialState,
    catalogType,
    setRootNode: (rootNode: ICatalogNode) => set({ rootNode }),
    setOffersToNodes: (offersToNodes: Record<number, ICatalogNode[]>) => set({ offersToNodes }),
    activateNode: (targetNode: ICatalogNode) => {
        if (targetNode.parent?.pageName && targetNode.parent.pageName === 'root') {
            for (const child of targetNode.children) {
                if (!child.visible) continue;

                targetNode = child;

                break;
            }
        }

        const nodes: ICatalogNode[] = [];

        let node: ICatalogNode | undefined = targetNode;

        while (node && (node.pageName !== 'root')) {
            nodes.push(node);

            node = node.parent;
        }

        nodes.reverse();

        set(x => {
            const isActive = x.activeNodes.indexOf(targetNode) >= 0;
            const isOpen = targetNode.isOpen;

            for (const n of x.activeNodes) {
                n.isActive = false;

                if (nodes.indexOf(n) === -1) n.isOpen = false;
            }

            for (const n of nodes) {
                n.isActive = true;

                if (n.parent) n.isOpen = true;

                if (n === targetNode.parent && n.children.length) n.isOpen = true;
            }

            if (isActive && isOpen) targetNode.isOpen = false;
            else targetNode.isOpen = true;

            return { activeNodes: nodes };
        })
    }
}));