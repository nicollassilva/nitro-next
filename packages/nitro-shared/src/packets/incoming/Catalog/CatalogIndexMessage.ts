import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { CatalogNodeParser } from './Data/CatalogNodeParser';
import { ICatalogNode } from './Data/ICatalogNode';

export type CatalogIndexMessageType = {
    root: ICatalogNode;
    newAdditionsAvailable: boolean;
    catalogType: string;
};

export class CatalogIndexMessage implements IIncomingPacket<CatalogIndexMessageType> {
    public parse(wrapper: IMessageDataWrapper): CatalogIndexMessageType {
        return {
            root: CatalogNodeParser(wrapper),
            newAdditionsAvailable: wrapper.readBoolean(),
            catalogType: wrapper.readString()
        }
    }
}
