import { type IMessageDataWrapper } from "@nitrodevco/nitro-api";

import { ParseInts } from "../../../Data";
import { IBundleDiscountRuleset } from "./IBundleDiscountRuleset";

export const BundleDiscountRulesetParser = (wrapper: IMessageDataWrapper): IBundleDiscountRuleset => {
    return {
        maxPurchaseSize: wrapper.readInt(),
        bundleSize: wrapper.readInt(),
        bundleDiscountSize: wrapper.readInt(),
        bonusThreshold: wrapper.readInt(),
        additionalBonusDiscountThresholdQuantities: ParseInts(wrapper)
    }
}