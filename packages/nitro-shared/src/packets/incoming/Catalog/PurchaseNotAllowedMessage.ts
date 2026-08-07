import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { CatalogPurchaseErrorType } from './Data/CatalogPurchaseErrorType';

export type PurchaseNotAllowedMessageType = {
    errorType: CatalogPurchaseErrorType;
};

export class PurchaseNotAllowedMessage implements IIncomingPacket<PurchaseNotAllowedMessageType> {
    public parse(wrapper: IMessageDataWrapper): PurchaseNotAllowedMessageType {
        return {
            errorType: wrapper.readInt()
        }
    }
}
