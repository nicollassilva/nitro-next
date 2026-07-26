import { useUserContext } from '#base/context';
import { selectOwnUserFigure } from '#base/stores';

export const useOwnUserFigure = () => useUserContext(selectOwnUserFigure);
