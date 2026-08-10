import { ICatalogPageLocalization, IMessageDataWrapper } from "@nitrodevco/nitro-api";

import { ParseStrings } from "../../../Data";

export const CatalogPageLocalizationParser = (wrapper: IMessageDataWrapper): ICatalogPageLocalization => {
    return {
        imageDatas: ParseStrings(wrapper),
        textDatas: ParseStrings(wrapper)
    }
}