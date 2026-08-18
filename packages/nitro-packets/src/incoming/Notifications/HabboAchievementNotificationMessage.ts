import { IAchievementData, IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { AchievementDataParser } from '../Inventory/Achievements/Data/AchievementDataParser';

export type HabboAchievementNotificationMessageType = {
    data: IAchievementData;
};

export class HabboAchievementNotificationMessage implements IIncomingPacket<HabboAchievementNotificationMessageType> {
    public parse(wrapper: IMessageDataWrapper): HabboAchievementNotificationMessageType {
        const packet: HabboAchievementNotificationMessageType = {
            data: AchievementDataParser(wrapper)
        };

        return packet;
    }
}
