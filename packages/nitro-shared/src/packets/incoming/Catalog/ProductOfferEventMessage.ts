import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { CatalogOfferParser } from './Data/CatalogOfferParser';
import { ICatalogOffer } from './Data/ICatalogOffer';

export type ProductOfferEventMessageType = {
    offer: ICatalogOffer;
};

export class ProductOfferEventMessage implements IIncomingPacket<ProductOfferEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): ProductOfferEventMessageType {
        return {
            offer: CatalogOfferParser(wrapper)
        }
    }
}
