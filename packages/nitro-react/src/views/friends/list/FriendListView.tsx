import { useLocalizationStore } from "#base/stores";
import { Frame } from "#base/theme";

export const FriendListView = () => {
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    return (
        <>
            <Frame variant="0" id="friendlist px-0" className="nitro-friendlist" caption={ getLocalizationValue('friendlist.friends') }>
                <div className="friendlist-bg">
                    
                </div>
            </Frame>
        </>
    );
}