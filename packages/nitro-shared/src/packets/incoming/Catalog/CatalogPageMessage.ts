import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { CatalogPageParser } from './Data/CatalogPageParser';
import { ICatalogPage } from './Data/ICatalogPage';

export type CatalogPageMessageType = {
    page: ICatalogPage
};

export class CatalogPageMessage implements IIncomingPacket<CatalogPageMessageType> {
    public parse(wrapper: IMessageDataWrapper): CatalogPageMessageType {
        return {
            page: CatalogPageParser(wrapper)
        }
    }
}
