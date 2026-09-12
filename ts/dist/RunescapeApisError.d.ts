import { Context } from './Context';
declare class RunescapeApisError extends Error {
    isRunescapeApisError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { RunescapeApisError };
