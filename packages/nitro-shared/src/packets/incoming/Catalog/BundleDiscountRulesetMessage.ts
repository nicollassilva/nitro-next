import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { BundleDiscountRulesetParser } from './Data/BundleDiscountRulesetParser';
import { IBundleDiscountRuleset } from './Data/IBundleDiscountRuleset';

export type BundleDiscountRulesetMessageType = {
    bundleDiscountRuleset: IBundleDiscountRuleset;
};

export class BundleDiscountRulesetMessage implements IIncomingPacket<BundleDiscountRulesetMessageType> {
    public parse(wrapper: IMessageDataWrapper): BundleDiscountRulesetMessageType {
        return {
            bundleDiscountRuleset: BundleDiscountRulesetParser(wrapper)
        }
    }
}
