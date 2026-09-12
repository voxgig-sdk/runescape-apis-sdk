import { RunescapeApisEntityBase } from '../RunescapeApisEntityBase';
import type { RunescapeApisSDK } from '../RunescapeApisSDK';
import type { Control } from '../types';
import type { OldSchoolGrandExchange, OldSchoolGrandExchangeListMatch } from '../RunescapeApisTypes';
declare class OldSchoolGrandExchangeEntity extends RunescapeApisEntityBase<OldSchoolGrandExchange> {
    constructor(client: RunescapeApisSDK, entopts: any);
    make(this: OldSchoolGrandExchangeEntity): OldSchoolGrandExchangeEntity;
    list(this: any, reqmatch?: OldSchoolGrandExchangeListMatch, ctrl?: Control): Promise<OldSchoolGrandExchangeEntity[]>;
}
export { OldSchoolGrandExchangeEntity };
