import { FurnitureTypeEnum, type IFurnitureData } from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

import { FurnitureData } from './FurnitureData';

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

type State = {
    floorItems: Record<number, IFurnitureData>;
    wallItems: Record<number, IFurnitureData>;
    furnitureLoaded: boolean;
};

type Actions = {
    parseFloorItems: (data: FurnitureType[]) => void;
    parseWallItems: (data: FurnitureType[]) => void;
};

const initialState: State = {
    floorItems: {},
    wallItems: {},
    furnitureLoaded: false,
};

export const FurnitureDataStore = createStore<State & Actions>((set, get) => ({
    ...initialState,
    parseFloorItems: (data: FurnitureType[]) => set(x => {
        const floorItems = { ...x.floorItems };

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

            floorItems[furniture.id] = new FurnitureData(
                FurnitureTypeEnum.Floor,
                furniture.id,
                furniture.classname,
                className,
                furniture.category ?? '',
                furniture.name ?? '',
                furniture.description ?? '',
                furniture.revision,
                furniture.xdim,
                furniture.ydim,
                0,
                colors,
                hasColorIndex,
                colorIndex,
                furniture.adurl ?? '',
                furniture.offerid,
                furniture.buyout,
                furniture.rentofferid,
                furniture.rentbuyout,
                furniture.bc,
                furniture.customparams ?? '',
                furniture.specialtype,
                furniture.canstandon,
                furniture.cansiton,
                furniture.canlayon,
                furniture.excludeddynamic,
                furniture.furniline ?? '',
                furniture.environment ?? '',
                furniture.rare,
            );
        }

        return { floorItems };
    }),
    parseWallItems: (data: FurnitureType[]) => set(x => {
        const wallItems = { ...x.wallItems };

        for (const furniture of data) {
            if (!furniture) continue;

            wallItems[furniture.id] = new FurnitureData(
                FurnitureTypeEnum.Wall,
                furniture.id,
                furniture.classname,
                furniture.classname,
                furniture.category ?? '',
                furniture.name ?? '',
                furniture.description ?? '',
                furniture.revision,
                0,
                0,
                0,
                [],
                false,
                0,
                furniture.adurl ?? '',
                furniture.offerid,
                furniture.buyout,
                furniture.rentofferid,
                furniture.rentbuyout,
                furniture.bc,
                '',
                furniture.specialtype,
                false,
                false,
                false,
                furniture.excludeddynamic,
                furniture.furniline ?? '',
                furniture.environment ?? '',
                furniture.rare,
            );
        }

        return { wallItems };
    })
}));
