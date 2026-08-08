import { CatalogPricingModelEnum, CatalogPricingTypeEnum, CatalogTypeEnum, FurnitureTypeEnum, ICatalogNode, ICatalogOffer, IProduct, IPurchasableOffer } from "@nitrodevco/nitro-api";
import { CatalogIndexMessage, CatalogPageMessage, CatalogPublishedMessage, ProductOfferEventMessage } from "@nitrodevco/nitro-shared";

import { useCatalogActions, useCatalogNavigation, useCatalogSelectors, useFurnitureDataActions } from "#base/context";
import { useMessageListener } from "#base/hooks";

export const useCatalogMessages = () => {
    const { catalogType, activePageId, activePage } = useCatalogSelectors();
    const { showCatalogPage, hideCatalog } = useCatalogNavigation();
    const { getFurnitureData, getProductData } = useFurnitureDataActions();
    const { setRootNode, setOffersToNodes, setFrontPageItems, setIsBusy, setActiveOffer, resetCatalog } = useCatalogActions();

    const stripAddonProducts = (products: IProduct[]) => {
        if (products.length === 1) return products;

        return products.filter(product => ((product.productType !== FurnitureTypeEnum.Badge) && (product.productType !== FurnitureTypeEnum.Effect) && (product.classId !== 108)));
    }

    const getOfferProduct = (offer: IPurchasableOffer) => {
        if (!offer.products.length) return undefined;

        if (offer.products.length === 1) return offer.products[0];

        return stripAddonProducts(offer.products)?.[0] ?? undefined;
    }

    const getPricingModelForProducts = (products: IProduct[]) => {
        const stripped = stripAddonProducts(products);

        if (stripped.length === 1) return stripped[0].productCount === 1 ? CatalogPricingModelEnum.Single : CatalogPricingModelEnum.Multi;

        if (stripped.length > 1) return CatalogPricingModelEnum.Bundle;

        return CatalogPricingModelEnum.Unknown;
    }

    const getPricingTypeForOffer = (offer: ICatalogOffer) => {
        if (offer.costCredits > 0 && offer.costCurrency > 0) return CatalogPricingTypeEnum.CreditsActivityPoints;

        if (offer.costCredits > 0) return CatalogPricingTypeEnum.Credits;

        if (offer.costCurrency > 0) return CatalogPricingTypeEnum.ActivityPoints;

        return CatalogPricingTypeEnum.None;
    }

    const processOffer = (offer: ICatalogOffer) => {
        if (!offer || !offer.products.length) return undefined;

        const productData = getProductData(offer.localizationId);
        const products: IProduct[] = [];

        let badgeCode: string | undefined = undefined;

        for (const product of offer.products) {
            const furnitureData = getFurnitureData(product.spriteId, product.productType);

            if (!furnitureData) continue;

            products.push({
                productType: product.productType,
                classId: product.spriteId,
                extraParam: product.extraParam,
                productCount: product.quantity,
                productData,
                furnitureData,
                isUnique: product.isUnique,
                uniqueSize: product.uniqueSize,
                uniqueLeft: product.uniqueRemaining
            });

            if (product.productType === FurnitureTypeEnum.Badge) badgeCode = product.extraParam;
        }

        const purchasableOffer = {
            pricingModel: getPricingModelForProducts(products),
            pricingType: getPricingTypeForOffer(offer),
            offerId: offer.id,
            localizationId: offer.localizationId,
            priceInCredits: offer.costCredits,
            priceInActivityPoints: offer.costCurrency,
            activityPointType: offer.costCurrencyType,
            giftable: offer.canGift,
            isRentOffer: offer.rentable,
            clubLevel: offer.clubLevel,
            products,
            bundlePurchaseAllowed: offer.canBundle,
            page: undefined,
            badgeCode: badgeCode
        } as IPurchasableOffer;

        if (!(catalogType == CatalogTypeEnum.Normal || (purchasableOffer.pricingModel !== CatalogPricingModelEnum.Bundle && purchasableOffer.pricingModel !== CatalogPricingModelEnum.Multi))) return undefined;

        return purchasableOffer;
    }

    useMessageListener(CatalogPublishedMessage, data => {
        resetCatalog();
        hideCatalog();

        //alert catalog.alert.published.description
    });

    useMessageListener(CatalogPageMessage, data => {
        const page = data.page;

        if (!page || page.catalogType !== catalogType || page.pageId !== activePageId) return;

        const purchasableOffers: IPurchasableOffer[] = [];

        for (const offer of page.offers) {
            const purchasableOffer = processOffer(offer);

            if (purchasableOffer) purchasableOffers.push(purchasableOffer);
        }

        if (page.frontPageItems.length) setFrontPageItems(page.frontPageItems);

        setIsBusy(false);

        showCatalogPage(page.pageId, page.layout, page.localization, purchasableOffers, page.offerId, page.acceptSeasonCurrencyAsCredits);
    });

    useMessageListener(ProductOfferEventMessage, data => {
        const purchasableOffer = processOffer(data.offer);

        if (!purchasableOffer) return;

        purchasableOffer.page = activePage;

        setActiveOffer(purchasableOffer);

        const product = getOfferProduct(purchasableOffer);

        if (product && product.productType === FurnitureTypeEnum.Wall) {
            // set purchase options
        }
    });

    useMessageListener(CatalogIndexMessage, data => {
        if (data.catalogType !== catalogType) return;

        const offers: Record<number, ICatalogNode[]> = {};

        const getNode = (node: ICatalogNode, depth: number, parent: ICatalogNode | undefined) => {
            node.depth = depth;
            node.parent = parent;

            for (const offerId of node.offerIds) {
                if (offers[offerId] !== undefined) offers[offerId].push(node);
                else offers[offerId] = [node];
            }

            depth++;

            for (const child of node.children) getNode(child, depth, node);

            return node;
        };

        setRootNode(getNode(data.root, 0, undefined));
        setOffersToNodes(offers);
    });

    return null;
}