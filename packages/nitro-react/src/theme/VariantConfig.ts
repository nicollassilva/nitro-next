import { VariantCascadeMap } from "./utils";

export const VARIANT_CASCADE_CONFIG: Partial<Record<string, Partial<Record<string, VariantCascadeMap>>>> = {
    frame: {
        '0': { header: '0' },
        '1': { header: '1' },
        '2': { header: '2' },
        '3': { header: '3', tabContext: '3', tabContent: '3' },
        '4': { header: '4' },
        '100': { header: '7' },
        '101': { header: '1' },
        '200': { header: '1' },
    },
    header: {
        '0': { closeButton: '0' },
        '1': { closeButton: '0' },
        '2': { closeButton: '0' },
        '3': { closeButton: '3' },
        '4': { closeButton: '0' },
        '7': { closeButton: '0' },
        '200': { closeButton: '0' },
    },
    tabContext: {
        '0': {},
        '3': { tabButton: '3' }
    }
};
