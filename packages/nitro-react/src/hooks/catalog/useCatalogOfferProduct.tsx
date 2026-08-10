import { FurnitureTypeEnum, IProduct, IPurchasableOffer } from "@nitrodevco/nitro-api";

export const useCatalogOfferProduct = (offer: IPurchasableOffer) => {
    const stripAddonProducts = (products: IProduct[]) => {
        if (products.length === 1) return products;

        return products.filter(product => ((product.productType !== FurnitureTypeEnum.Badge) && (product.productType !== FurnitureTypeEnum.Effect) && (product.classId !== 108)));
    }

    if (!offer.products.length) return undefined;

    if (offer.products.length === 1) return offer.products[0];

    return stripAddonProducts(offer.products)?.[0] ?? undefined;
}