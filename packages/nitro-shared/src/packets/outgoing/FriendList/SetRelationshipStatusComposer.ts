import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetRelationshipStatusComposerType = {
    userId: number;
    relationshipType: number;
};

export class SetRelationshipStatusComposer implements IOutgoingPacket<SetRelationshipStatusComposerType> {
    public constructor(private params: SetRelationshipStatusComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.userId, this.params.relationshipType
        ];
    }
}
