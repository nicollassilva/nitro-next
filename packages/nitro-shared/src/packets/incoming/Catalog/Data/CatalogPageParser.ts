import { ICatalogPage, IMessageDataWrapper } from "@nitrodevco/nitro-api";

import { ParseArray } from "../../../Data";
import { CatalogFrontPageItemParser } from "./CatalogFrontPageItemParser";
import { CatalogOfferParser } from "./CatalogOfferParser";
import { CatalogPageLocalizationParser } from "./CatalogPageLocalizationParser";

export const CatalogPageParser = (wrapper: IMessageDataWrapper): ICatalogPage => {
    return {
        pageId: wrapper.readInt(),
        catalogType: wrapper.readString(),
        layout: wrapper.readString(),
        localization: CatalogPageLocalizationParser(wrapper),
        offers: ParseArray(wrapper, CatalogOfferParser),
        offerId: wrapper.readInt(),
        acceptSeasonCurrencyAsCredits: wrapper.readBoolean(),
        frontPageItems: ParseArray(wrapper, CatalogFrontPageItemParser)
    }
}