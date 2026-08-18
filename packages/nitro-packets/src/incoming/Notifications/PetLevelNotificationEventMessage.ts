import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetLevelNotificationEventMessageType = {
    petId: number;
    figureData: string;
    petName: string;
    level: number;
};

export class PetLevelNotificationEventMessage implements IIncomingPacket<PetLevelNotificationEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): PetLevelNotificationEventMessageType {
        const packet: PetLevelNotificationEventMessageType = {
            petId: wrapper.readInt(),
            figureData: wrapper.readString(),
            petName: wrapper.readString(),
            level: wrapper.readInt()
        };

        return packet;
    }
}
