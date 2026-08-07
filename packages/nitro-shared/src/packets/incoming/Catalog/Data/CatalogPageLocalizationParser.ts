import { IMessageDataWrapper } from "@nitrodevco/nitro-api";

import { ParseStrings } from "../../../Data";
import { ICatalogPageLocalization } from "./ICatalogPageLocalization";

export const CatalogPageLocalizationParser = (wrapper: IMessageDataWrapper): ICatalogPageLocalization => {
    return {
        imageDatas: ParseStrings(wrapper),
        textDatas: ParseStrings(wrapper)
    }
}