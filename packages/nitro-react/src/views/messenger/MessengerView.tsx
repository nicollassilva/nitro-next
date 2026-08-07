import { useTranslation } from "#base/context";
import { useSystemActions } from "#base/context/system";
import { cn, Frame } from "#base/theme";

export const MessengerView = () => {
    const { toggleWindow } = useSystemActions();
    const t = useTranslation();

    return (
        <Frame variant="100" id="messenger" className={cn('w-57.5 min-h-26.75 leading-none')} contentClassName="px-0! pt-0! -mt-px" caption={t('friendlist.messages')} onClose={() => toggleWindow('messenger')}>
            chats
        </Frame>
    );
}