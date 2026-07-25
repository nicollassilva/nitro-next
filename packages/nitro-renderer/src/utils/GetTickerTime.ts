import { GetTicker } from './GetTicker';

export const GetTickerTime = () => Math.floor(GetTicker().lastTime);
