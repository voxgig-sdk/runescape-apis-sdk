import { RunescapeApisEntityBase } from '../RunescapeApisEntityBase';
import type { RunescapeApisSDK } from '../RunescapeApisSDK';
import type { Control } from '../types';
import type { GrandExchangeDatabase, GrandExchangeDatabaseLoadMatch, GrandExchangeDatabaseListMatch } from '../RunescapeApisTypes';
declare class GrandExchangeDatabaseEntity extends RunescapeApisEntityBase<GrandExchangeDatabase> {
    constructor(client: RunescapeApisSDK, entopts: any);
    make(this: GrandExchangeDatabaseEntity): GrandExchangeDatabaseEntity;
    load(this: any, reqmatch?: GrandExchangeDatabaseLoadMatch, ctrl?: Control): Promise<GrandExchangeDatabaseEntity>;
    list(this: any, reqmatch?: GrandExchangeDatabaseListMatch, ctrl?: Control): Promise<GrandExchangeDatabaseEntity[]>;
}
export { GrandExchangeDatabaseEntity };
