import { useLocalizationStore } from "#base/stores";
import { Frame } from "#base/theme";

export const FriendListView = () => {
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);

    return (
        <>
            <Frame variant="0" id="friendlist" className="nitro-friendlist" containerClassName="!px-0" caption={ getLocalizationValue('friendlist.friends') }>
                <div className="friendlist-bg">
                    
                </div>
            </Frame>
        </>
    );
}