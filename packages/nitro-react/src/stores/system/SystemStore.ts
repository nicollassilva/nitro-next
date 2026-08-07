import { FurnitureTypeEnum, IFurnitureData, IProductData } from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

type State = {
    visibleWindows: string[];
    localizations: Record<string, string>;
    badgePointLimits: Record<string, number>;
    floorItems: Record<number, IFurnitureData>;
    wallItems: Record<number, IFurnitureData>;
    productData: Record<string, IProductData>;
}

type Actions = {
    toggleWindow: (name: string) => void;
    getLocalizationValue: (key: string, defaultValue?: string, replacements?: Record<string, string>) => string;
    setLocalization: (localization: Record<string, string>) => void;
    setLocalizationForFurniture: (furniture: IFurnitureData[]) => void;
    parseFloorItems: (data: FurnitureType[]) => void;
    parseWallItems: (data: FurnitureType[]) => void;
    parseProductData: (data: IProductData[]) => void;
};

type FurnitureType = {
    id: number;
    classname: string;
    revision: number;
    /** Null on some entries (e.g. newer NFT/diamond items) */
    category: string | null;
    defaultdir: number;
    xdim: number;
    ydim: number;
    /** Only present on a subset of items (~5078/17091 in this dataset) */
    partcolors?: {
        color: string[];
    };
    name: string | null;
    description: string | null;
    adurl: null;
    offerid: number;
    buyout: boolean;
    rentofferid: number;
    rentbuyout: boolean;
    bc: boolean;
    excludeddynamic: boolean;
    bcofferid: number;
    /** Colon-delimited coordinate/rotation strings, or a plain numeric string flag, or null */
    customparams: string | null;
    specialtype: number;
    canstandon: boolean;
    cansiton: boolean;
    canlayon: boolean;
    canputstuffon: boolean;
    height: number;
    furniline: string | null;
    environment: string | null;
    rare: boolean;
    tradeable: boolean;
    recyclable: boolean;
}

const initialState: State = {
    visibleWindows: [],
    localizations: {},
    badgePointLimits: {},
    floorItems: {},
    wallItems: {},
    productData: {},
};

export type SystemStore = State & Actions;

export const createSystemStore = () => createStore<SystemStore>()((set, get, store) => ({
    ...initialState,
    toggleWindow: (name: string) => set(x => {
        const visibleWindows = [...x.visibleWindows];
        const index = visibleWindows.indexOf(name);

        if (index >= 0) visibleWindows.splice(index, 1);
        else visibleWindows.push(name);

        return { visibleWindows };
    }),
    getLocalizationValue: (key: string, defaultValue?: string, replacements?: Record<string, string>) => {
        let value = get().localizations[key] ?? defaultValue;

        if (replacements) {
            const keys = Object.keys(replacements);

            if (keys.length) for (const key of keys) value = value.replace(`%${key}%`, replacements[key]);
        }

        return value;
    },
    setLocalization: (localizations: Record<string, string>) =>
        set(state => {
            return {
                localizations: { ...state.localizations, ...localizations },
                localizationNeedsUpdate: false,
            };
        }),
    setLocalizationForFurniture: (furniture: IFurnitureData[]) => {
        if (!furniture || !furniture.length) return;

        const locals = new Map<string, string>();

        for (const item of furniture) {
            switch (item.type) {
                case FurnitureTypeEnum.Floor:
                    locals.set(`roomitem.name.${item.id}`, item.localizedName);
                    locals.set(`roomitem.desc.${item.id}`, item.description);
                    break;
                case FurnitureTypeEnum.Wall:
                    locals.set(`wallitem.name.${item.id}`, item.localizedName);
                    locals.set(`wallitem.desc.${item.id}`, item.description);
                    break;
            }
        }

        if (locals.size === 0) return;

        set(state => {
            const localizations = { ...state.localizations };

            for (const [key, value] of locals) localizations[key] = value;

            return { localizations };
        });
    },
    parseFloorItems: (data: FurnitureType[]) => set(x => {
        const floorItems: Record<number, IFurnitureData> = {};

        for (const furniture of data) {
            if (!furniture) continue;

            const colors: number[] = [];

            if (furniture.partcolors) {
                for (const color of furniture.partcolors.color) {
                    let colorCode = color;

                    if (colorCode.charAt(0) === '#') {
                        colorCode = colorCode.replace('#', '');

                        colors.push(parseInt(colorCode, 16));
                    } else {
                        colors.push(parseInt(colorCode, 16));
                    }
                }
            }

            const classSplit = furniture.classname.split('*');
            const className = classSplit[0];
            const colorIndex = classSplit.length > 1 ? parseInt(classSplit[1]) : 0;
            const hasColorIndex = classSplit.length > 1;

            floorItems[furniture.id] = {
                type: FurnitureTypeEnum.Floor,
                id: furniture.id,
                fullName: furniture.classname,
                className: className,
                category: furniture.category ?? '',
                localizedName: furniture.name ?? '',
                description: furniture.description ?? '',
                revision: furniture.revision,
                tileSizeX: furniture.xdim,
                tileSizeY: furniture.ydim,
                tileSizeZ: 0,
                colors: colors,
                hasIndexedColor: hasColorIndex,
                colorIndex: colorIndex,
                adUrl: furniture.adurl ?? '',
                purchaseOfferId: furniture.offerid,
                purchaseCouldBeUsedForBuyout: furniture.buyout,
                rentOfferId: furniture.rentofferid,
                rentCouldBeUsedForBuyout: furniture.rentbuyout,
                availableForBuildersClub: furniture.bc,
                customParams: furniture.customparams ?? '',
                specialType: furniture.specialtype,
                canStandOn: furniture.canstandon,
                canSitOn: furniture.cansiton,
                canLayOn: furniture.canlayon,
                excludeDynamic: furniture.excludeddynamic,
                furniLine: furniture.furniline ?? '',
                environment: furniture.environment ?? '',
                rare: furniture.rare,
                isExternalImage: !(className.indexOf('external_image') === -1)
            };
        }

        return { floorItems };
    }),
    parseWallItems: (data: FurnitureType[]) => set(x => {
        const wallItems = { ...x.wallItems };

        for (const furniture of data) {
            if (!furniture) continue;

            wallItems[furniture.id] = {
                type: FurnitureTypeEnum.Wall,
                id: furniture.id,
                fullName: furniture.classname,
                className: furniture.classname,
                category: furniture.category ?? '',
                localizedName: furniture.name ?? '',
                description: furniture.description ?? '',
                revision: furniture.revision,
                tileSizeX: 0,
                tileSizeY: 0,
                tileSizeZ: 0,
                colors: [],
                hasIndexedColor: false,
                colorIndex: 0,
                adUrl: furniture.adurl ?? '',
                purchaseOfferId: furniture.offerid,
                purchaseCouldBeUsedForBuyout: furniture.buyout,
                rentOfferId: furniture.rentofferid,
                rentCouldBeUsedForBuyout: furniture.rentbuyout,
                availableForBuildersClub: furniture.bc,
                customParams: '',
                specialType: furniture.specialtype,
                canStandOn: false,
                canSitOn: false,
                canLayOn: false,
                excludeDynamic: furniture.excludeddynamic,
                furniLine: furniture.furniline ?? '',
                environment: furniture.environment ?? '',
                rare: furniture.rare,
                isExternalImage: !(furniture.classname.indexOf('external_image') === -1)
            };
        }

        return { wallItems };
    }),
    parseProductData: (data: IProductData[]) => set({ productData: Object.fromEntries(data.map(x => [x.code, x])) })
}));
