import { Border } from "#base/theme";

export const PurseView = () => {
    return (
        <>
            <Border id="purse" variant="9" className="nitro-purse">
                <div className="purse-grid">
                    <div className="purse-left">
                        test
                    </div>
                    <div className="purse-mid">
                        <Border className="w-full py-0.5" variant="1" tintColor="#807e7e">test</Border>
                        <Border className="w-full py-0.5" variant="1" tintColor="#807e7e">test</Border>
                    </div>
                    <div className="purse-right border">
                        test
                    </div>
                </div>
            </Border>
        </>
    );
}