import { useTranslation } from "#base/context";
import { useSystemActions } from "#base/context/system";
import { Frame } from "#base/theme";

export const CatalogView = () => {
    const { toggleWindow } = useSystemActions();
    const t = useTranslation();

    return (
        <Frame id="catalog" variant="3" className="w-142.5 h-150" caption={t('catalog.title')} onClose={() => toggleWindow('catalog')}>
            test
        </Frame>
    );
}