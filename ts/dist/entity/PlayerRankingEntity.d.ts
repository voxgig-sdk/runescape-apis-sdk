import { RunescapeApisEntityBase } from '../RunescapeApisEntityBase';
import type { RunescapeApisSDK } from '../RunescapeApisSDK';
import type { Control } from '../types';
import type { PlayerRanking, PlayerRankingListMatch } from '../RunescapeApisTypes';
declare class PlayerRankingEntity extends RunescapeApisEntityBase<PlayerRanking> {
    constructor(client: RunescapeApisSDK, entopts: any);
    make(this: PlayerRankingEntity): PlayerRankingEntity;
    list(this: any, reqmatch?: PlayerRankingListMatch, ctrl?: Control): Promise<PlayerRankingEntity[]>;
}
export { PlayerRankingEntity };
