import { GrandExchangeDatabaseEntity } from './entity/GrandExchangeDatabaseEntity';
import { OldSchoolGrandExchangeEntity } from './entity/OldSchoolGrandExchangeEntity';
import { PlayerRankingEntity } from './entity/PlayerRankingEntity';
export type * from './RunescapeApisTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { RunescapeApisEntityBase } from './RunescapeApisEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class RunescapeApisSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    GrandExchangeDatabase(entopts?: Record<string, any>): GrandExchangeDatabaseEntity;
    OldSchoolGrandExchange(entopts?: Record<string, any>): OldSchoolGrandExchangeEntity;
    PlayerRanking(entopts?: Record<string, any>): PlayerRankingEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): RunescapeApisSDK;
    tester(testopts?: any, sdkopts?: any): RunescapeApisSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof RunescapeApisSDK;
export { stdutil, config, BaseFeature, RunescapeApisEntityBase, RunescapeApisSDK, SDK, };
