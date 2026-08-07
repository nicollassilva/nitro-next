import { FurnitureTypeEnum, IFurnitureData } from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

type State = {
    visibleWindows: string[];
    localizations: Record<string, string>;
    badgePointLimits: Record<string, number>;
}

type Actions = {
    toggleWindow: (name: string) => void;
    getLocalizationValue: (key: string, defaultValue?: string, replacements?: Record<string, string>) => string;
    setLocalization: (localization: Record<string, string>) => void;
    setLocalizationForFurniture: (furniture: IFurnitureData[]) => void;
};

const initialState: State = {
    visibleWindows: [],
    localizations: {},
    badgePointLimits: {}
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
}));
