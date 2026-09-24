"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunescapeApisError = void 0;
class RunescapeApisError extends Error {
    isRunescapeApisError = true;
    sdk = 'RunescapeApis';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.RunescapeApisError = RunescapeApisError;
//# sourceMappingURL=RunescapeApisError.js.map