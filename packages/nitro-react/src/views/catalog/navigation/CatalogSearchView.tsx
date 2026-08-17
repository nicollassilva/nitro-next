import { CatalogTypeEnum, ICatalogNode, IFurnitureData, IPurchasableOffer } from "@nitrodevco/nitro-api";
import { MouseEvent, useEffect, useState } from "react";

import { useCatalogActions, useCatalogSelectors, useFurnitureDataSelector, useTranslation } from "#base/context";
import { useCatalogNavigation, useCatalogOfferActions } from "#base/hooks";
import { Border, NitroIcon } from "#base/theme";

export const CatalogSearchView = () => {
    const [searchValue, setSearchValue] = useState('');
    const { floorItems, wallItems } = useFurnitureDataSelector();
    const { catalogType, rootNode, offersToNodes } = useCatalogSelectors();
    const { setSearchResult } = useCatalogActions();
    const { showCatalogPage } = useCatalogNavigation();
    const { processAsOffer } = useCatalogOfferActions();
    const t = useTranslation();

    const onIconClick = (e: MouseEvent) => {
        if (searchValue.length > 0) setSearchValue('');
    }

    const getOfferNodes = (offerId: number, flag: boolean = false) => {
        if (!flag) return offersToNodes[offerId] ?? [];

        const allowedNodes: ICatalogNode[] = [];

        for (const node of offersToNodes[offerId]) {
            if (node.visible) allowedNodes.push(node);
        }

        return allowedNodes;
    }

    const filterNodes = (search: string, furniLines: string[], node: ICatalogNode, nodes: ICatalogNode[]) => {
        if (node.visible && (node.pageId > 0)) {
            let nodeAdded = false;

            const hayStack = [node.pageName, node.localization].join(' ').toLowerCase().replace(/ /gi, '');

            if (hayStack.indexOf(search) > -1) {
                nodes.push(node);

                nodeAdded = true;
            }

            if (!nodeAdded) {
                for (const furniLine of furniLines) {
                    if (hayStack.indexOf(furniLine) >= 0) {
                        nodes.push(node);

                        break;
                    }
                }
            }
        }

        for (const child of node.children) filterNodes(search, furniLines, child, nodes);
    }

    useEffect(() => {
        const search = searchValue?.toLocaleLowerCase().replace(' ', '');

        if (!search || !search.length) {
            setSearchResult(undefined);
            // return to previous page id

            return;
        }

        const timeout = setTimeout(() => {
            if (!rootNode) return;

            const furnitureDatas: Record<number, IFurnitureData> = { ...floorItems, ...wallItems };
            const foundFurniture: IFurnitureData[] = [];
            const foundFurniLines: string[] = [];

            for (const furnitureData of Object.values(furnitureDatas)) {
                if (!furnitureData) continue;

                if ((catalogType === CatalogTypeEnum.BuildersClub) && !furnitureData.availableForBuildersClub) continue;

                if ((catalogType === CatalogTypeEnum.Normal) && furnitureData.excludeDynamic) continue;

                const searchValues = [furnitureData.className, furnitureData.localizedName, furnitureData.description].join(' ').replace(/ /gi, '').toLowerCase();

                if ((catalogType === CatalogTypeEnum.BuildersClub) && (furnitureData.purchaseOfferId === -1) && (furnitureData.rentOfferId === -1)) {
                    if ((furnitureData.furniLine !== '') && (foundFurniLines.indexOf(furnitureData.furniLine) < 0)) {
                        if (searchValues.indexOf(search) >= 0) foundFurniLines.push(furnitureData.furniLine);
                    }
                } else {
                    const foundNodes = [
                        ...getOfferNodes(furnitureData.purchaseOfferId),
                        ...getOfferNodes(furnitureData.rentOfferId)
                    ];

                    if (foundNodes.length) {
                        if (searchValues.indexOf(search) >= 0) foundFurniture.push(furnitureData);

                        if (foundFurniture.length === 250) break;
                    }
                }
            }

            const purchasableOffers: IPurchasableOffer[] = [];

            for (const furniture of foundFurniture) {
                const offer = processAsOffer(furniture);

                if (!offer) continue;

                purchasableOffers.push(offer);
            }

            const nodes: ICatalogNode[] = [];

            filterNodes(search, foundFurniLines, rootNode, nodes);

            setSearchResult({
                searchValue: search,
                offers: purchasableOffers,
                nodes: nodes.filter(x => x.visible)
            });

            showCatalogPage(-1, 'default_3x3', { imageDatas: [], textDatas: [] }, purchasableOffers, -1, false, 1);
        }, 300);

        return () => clearTimeout(timeout);
    }, [offersToNodes, catalogType, rootNode, searchValue]);

    return (
        <Border variant="105" className="flex items-center justify-center min-h-6 max-h-6 px-1.5 gap-1.5">
            <input type="text" className="flex-1 min-w-0 text-[0.75rem] text-[#666666]" placeholder={t('catalog.search')} value={searchValue} onChange={e => setSearchValue(e.target.value)} />
            <NitroIcon icon={searchValue.length > 0 ? "catalog-icon-clear" : "pencil-icon"} className="cursor-pointer shrink-0" onClick={onIconClick} />
        </Border>
    );
}