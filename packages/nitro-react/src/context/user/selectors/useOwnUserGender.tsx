import { useUserContext } from '#base/context';
import { selectOwnUserGender } from '#base/stores';

export const useOwnUserGender = () => useUserContext(selectOwnUserGender);
