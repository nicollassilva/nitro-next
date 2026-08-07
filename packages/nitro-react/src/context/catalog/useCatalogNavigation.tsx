import { GetCatalogPageComposer, ICatalogNode } from "@nitrodevco/nitro-shared";

import { useWebSocketContext } from "../communication";
import { useCatalogActions } from "./useCatalogActions";
import { useCatalogSelectors } from "./useCatalogSelectors"

export const useCatalogNavigation = () => {
    const { catalogType, activeNodes } = useCatalogSelectors();
    const { setActiveNodes, setIsBusy, setActivePageId } = useCatalogActions();
    const { send } = useWebSocketContext();

    const isNodeActive = (node: ICatalogNode) => activeNodes.indexOf(node) >= 0;

    const loadCatalogPage = (pageId: number, offerId: number) => {
        if (pageId < 0) return;

        setIsBusy(true);
        setActivePageId(pageId);

        send(new GetCatalogPageComposer({ pageId, offerId, catalogType }));
    }

    const activateNode = (targetNode: ICatalogNode, offerId: number = -1) => {
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

        const prevNodes = [...activeNodes];
        const isActive = prevNodes.indexOf(targetNode) >= 0;
        const isOpen = targetNode.isOpen;

        for (const n of prevNodes) {
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

        setActiveNodes(nodes);

        if (targetNode.pageId > -1) loadCatalogPage(targetNode.pageId, offerId);
    }

    return { isNodeActive, loadCatalogPage, activateNode };
}