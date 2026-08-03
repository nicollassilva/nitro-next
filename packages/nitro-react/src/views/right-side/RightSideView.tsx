import { PurseView } from "./purse/PurseView";
import { SeasonalView } from "./purse/seasonal/SeasonalView";

export const RightSideView = () => {
    return (
        <div className="nitro-right-side-container">
            <PurseView />
            <div className="notifications-container">
                <SeasonalView />
            </div>
        </div>
    );
}