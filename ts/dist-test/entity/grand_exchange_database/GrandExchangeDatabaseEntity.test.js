"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('GrandExchangeDatabaseEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when RUNESCAPE_APIS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('RUNESCAPE_APIS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.RunescapeApisSDK.test();
        const ent = testsdk.GrandExchangeDatabase();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.RUNESCAPE_APIS_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'grand_exchange_database.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "average", "req": false, "short": "30-day moving average with timestamp as key", "type": "`$OBJECT`", "index$": 0 }, { "active": true, "name": "current", "req": false, "type": "`$OBJECT`", "union": { "branches": 2, "count": 1, "depth": 2 }, "index$": 1 }, { "active": true, "name": "daily", "req": false, "short": "Daily prices with timestamp as key", "type": "`$OBJECT`", "index$": 2 }, { "active": true, "name": "day180", "req": false, "type": "`$OBJECT`", "index$": 3 }, { "active": true, "name": "day30", "req": false, "type": "`$OBJECT`", "index$": 4 }, { "active": true, "name": "day90", "req": false, "type": "`$OBJECT`", "index$": 5 }, { "active": true, "name": "description", "req": false, "short": "The item examine text", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "icon", "req": false, "short": "The item sprite image URL", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "icon_large", "req": false, "short": "The item detail image URL", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "id", "req": false, "short": "The ItemID", "type": "`$INTEGER`", "index$": 9 }, { "active": true, "name": "items", "req": false, "short": "The number of items starting with this letter", "type": "`$INTEGER`", "index$": 10 }, { "active": true, "name": "lastConfigUpdateRuneday", "req": false, "short": "The runedate when the database was last updated", "type": "`$INTEGER`", "index$": 11 }, { "active": true, "name": "letter", "req": false, "short": "The first letter of an item", "type": "`$STRING`", "index$": 12 }, { "active": true, "name": "members", "req": false, "short": "Whether the item is members-only", "type": "`$STRING`", "index$": 13 }, { "active": true, "name": "name", "req": false, "short": "The item name", "type": "`$STRING`", "index$": 14 }, { "active": true, "name": "today", "req": false, "type": "`$OBJECT`", "union": { "branches": 2, "count": 1, "depth": 2 }, "index$": 15 }, { "active": true, "name": "type", "req": false, "short": "The item category", "type": "`$STRING`", "index$": 16 }, { "active": true, "name": "typeIcon", "req": false, "short": "The item category icon URL", "type": "`$STRING`", "index$": 17 }], "id": { "field": "id", "name": "id" }, "name": "grand_exchange_database", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "alpha", "orig": "alpha", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "category", "orig": "category", "reqd": true, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "kind": "query", "name": "page", "orig": "page", "reqd": true, "type": "`$INTEGER`", "index$": 2 }] }, "contract": { "id": "GET /m=itemdb_rs/api/catalogue/items.json", "json": "{\"operationId\":\"getItemsByCategory\",\"parameters\":[{\"description\":\"The category identification number (0-43)\",\"in\":\"query\",\"name\":\"category\",\"required\":true,\"schema\":{\"maximum\":43,\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"The starting letter for the items (lowercase). Use %23 for numbers.\",\"in\":\"query\",\"name\":\"alpha\",\"required\":true,\"schema\":{\"pattern\":\"^[a-z]$|^%23$\",\"type\":\"string\"}},{\"description\":\"The page number beginning at 1\",\"in\":\"query\",\"name\":\"page\",\"required\":true,\"schema\":{\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"items\":{\"items\":{\"properties\":{\"current\":{\"properties\":{\"price\":{\"description\":\"The item trade price (can be integer or string)\",\"oneOf\":[{\"type\":\"integer\"},{\"type\":\"string\"}]},\"trend\":{\"description\":\"The price trend direction\",\"enum\":[\"positive\",\"negative\",\"neutral\"],\"type\":\"string\"}},\"type\":\"object\"},\"description\":{\"description\":\"The item examine text\",\"type\":\"string\"},\"icon\":{\"description\":\"The item sprite image URL\",\"type\":\"string\"},\"icon_large\":{\"description\":\"The item detail image URL\",\"type\":\"string\"},\"id\":{\"description\":\"The ItemID\",\"type\":\"integer\"},\"members\":{\"description\":\"Whether the item is members-only\",\"enum\":[\"true\",\"false\"],\"type\":\"string\"},\"name\":{\"description\":\"The item name\",\"type\":\"string\"},\"today\":{\"properties\":{\"price\":{\"description\":\"The item trade price (can be integer or string)\",\"oneOf\":[{\"type\":\"integer\"},{\"type\":\"string\"}]},\"trend\":{\"description\":\"The price trend direction\",\"enum\":[\"positive\",\"negative\",\"neutral\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"description\":\"The item category\",\"type\":\"string\"},\"typeIcon\":{\"description\":\"The item category icon URL\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"description\":\"The total number of items in the category\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with items list\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/m=itemdb_rs/api/catalogue/items.json", "segments": [{ "lit": "m=itemdb_rs" }, { "lit": "api" }, { "lit": "catalogue" }, { "lit": "items.json" }], "select": { "exist": ["alpha", "category", "page"] }, "transform": { "req": "`reqdata`", "res": "`body.items`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "category", "orig": "category", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /m=itemdb_rs/api/catalogue/category.json", "json": "{\"operationId\":\"getCategoryInfo\",\"parameters\":[{\"description\":\"The category identification number (0-43)\",\"in\":\"query\",\"name\":\"category\",\"required\":true,\"schema\":{\"maximum\":43,\"minimum\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"alpha\":{\"items\":{\"properties\":{\"items\":{\"description\":\"The number of items starting with this letter\",\"type\":\"integer\"},\"letter\":{\"description\":\"The first letter of an item\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"types\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with category information\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/m=itemdb_rs/api/catalogue/category.json", "segments": [{ "lit": "m=itemdb_rs" }, { "lit": "api" }, { "lit": "catalogue" }, { "lit": "category.json" }], "select": { "exist": ["category"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /m=itemdb_rs/obj_big.gif", "json": "{\"operationId\":\"getItemLargeImage\",\"parameters\":[{\"description\":\"The ItemID\",\"in\":\"query\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/gif\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successful response with item image\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/m=itemdb_rs/obj_big.gif", "segments": [{ "lit": "m=itemdb_rs" }, { "lit": "obj_big.gif" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /m=itemdb_rs/obj_sprite.gif", "json": "{\"operationId\":\"getItemSpriteImage\",\"parameters\":[{\"description\":\"The ItemID\",\"in\":\"query\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/gif\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successful response with item sprite\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/m=itemdb_rs/obj_sprite.gif", "segments": [{ "lit": "m=itemdb_rs" }, { "lit": "obj_sprite.gif" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "item", "orig": "item", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /m=itemdb_rs/api/catalogue/detail.json", "json": "{\"operationId\":\"getItemDetail\",\"parameters\":[{\"description\":\"The ItemID\",\"in\":\"query\",\"name\":\"item\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"item\":{\"properties\":{\"current\":{\"properties\":{\"price\":{\"description\":\"The item trade price (can be integer or string)\",\"oneOf\":[{\"type\":\"integer\"},{\"type\":\"string\"}]},\"trend\":{\"description\":\"The price trend direction\",\"enum\":[\"positive\",\"negative\",\"neutral\"],\"type\":\"string\"}},\"type\":\"object\"},\"day180\":{\"properties\":{\"change\":{\"description\":\"The percentage change in price\",\"type\":\"string\"},\"trend\":{\"description\":\"The price trend direction\",\"enum\":[\"positive\",\"negative\",\"neutral\"],\"type\":\"string\"}},\"type\":\"object\"},\"day30\":{\"properties\":{\"change\":{\"description\":\"The percentage change in price\",\"type\":\"string\"},\"trend\":{\"description\":\"The price trend direction\",\"enum\":[\"positive\",\"negative\",\"neutral\"],\"type\":\"string\"}},\"type\":\"object\"},\"day90\":{\"properties\":{\"change\":{\"description\":\"The percentage change in price\",\"type\":\"string\"},\"trend\":{\"description\":\"The price trend direction\",\"enum\":[\"positive\",\"negative\",\"neutral\"],\"type\":\"string\"}},\"type\":\"object\"},\"description\":{\"description\":\"The item examine text\",\"type\":\"string\"},\"icon\":{\"description\":\"The item sprite image URL\",\"type\":\"string\"},\"icon_large\":{\"description\":\"The item detail image URL\",\"type\":\"string\"},\"id\":{\"description\":\"The ItemID\",\"type\":\"integer\"},\"members\":{\"description\":\"Whether the item is members-only\",\"enum\":[\"true\",\"false\"],\"type\":\"string\"},\"name\":{\"description\":\"The item name\",\"type\":\"string\"},\"today\":{\"properties\":{\"price\":{\"description\":\"The item trade price (can be integer or string)\",\"oneOf\":[{\"type\":\"integer\"},{\"type\":\"string\"}]},\"trend\":{\"description\":\"The price trend direction\",\"enum\":[\"positive\",\"negative\",\"neutral\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"description\":\"The item category\",\"type\":\"string\"},\"typeIcon\":{\"description\":\"The item category icon URL\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with item details\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/m=itemdb_rs/api/catalogue/detail.json", "segments": [{ "lit": "m=itemdb_rs" }, { "lit": "api" }, { "lit": "catalogue" }, { "lit": "detail.json" }], "select": { "exist": ["item"] }, "transform": { "req": "`reqdata`", "res": "`body.item`" }, "index$": 2 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "item_id", "orig": "item_id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /m=itemdb_rs/api/graph/{itemId}.json", "json": "{\"operationId\":\"getItemGraph\",\"parameters\":[{\"description\":\"The ItemID\",\"in\":\"path\",\"name\":\"itemId\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"average\":{\"additionalProperties\":{\"type\":\"integer\"},\"description\":\"30-day moving average with timestamp as key\",\"type\":\"object\"},\"daily\":{\"additionalProperties\":{\"type\":\"integer\"},\"description\":\"Daily prices with timestamp as key\",\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with price history\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/m=itemdb_rs/api/graph/{itemId}.json", "segments": [{ "lit": "m=itemdb_rs" }, { "lit": "api" }, { "lit": "graph" }, { "lit": "{itemId}.json" }], "select": { "exist": ["item_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": {}, "contract": { "id": "GET /m=itemdb_rs/api/info.json", "json": "{\"operationId\":\"getGEInfo\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"lastConfigUpdateRuneday\":{\"description\":\"The runedate when the database was last updated\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with database update information\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/m=itemdb_rs/api/info.json", "segments": [{ "lit": "m=itemdb_rs" }, { "lit": "api" }, { "lit": "info.json" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "grand_exchange_database", "name__orig": "grand_exchange_database", "Name": "GrandExchangeDatabase", "name_": "grand_exchange_database", "name-": "grand-exchange-database", "NAME": "GRAND_EXCHANGE_DATABASE", "index$": 0 }, { "active": true, "entity": "grand_exchange_database", "key$": "BasicGrandExchangeDatabaseFlow", "kind": "basic", "name": "BasicGrandExchangeDatabaseFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "grand_exchange_database_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "grand_exchange_database_ref01", "srcdatavar": "grand_exchange_database_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-grand_exchange_database_ref01" } }], "index$": 1 }] }, 'GrandExchangeDatabase');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let grand_exchange_database_ref01_data = Object.values(setup.data.existing.grand_exchange_database)[0];
        // LIST
        const grand_exchange_database_ref01_ent = client.GrandExchangeDatabase();
        const grand_exchange_database_ref01_match = {};
        const grand_exchange_database_ref01_list = (await grand_exchange_database_ref01_ent.list(grand_exchange_database_ref01_match)).map((e) => e.data());
        // LOAD
        const grand_exchange_database_ref01_match_dt0 = {};
        grand_exchange_database_ref01_match_dt0.id = grand_exchange_database_ref01_data.id;
        const grand_exchange_database_ref01_data_dt0 = (await grand_exchange_database_ref01_ent.load(grand_exchange_database_ref01_match_dt0)).data();
        (0, node_assert_1.default)(grand_exchange_database_ref01_data_dt0.id === grand_exchange_database_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/grand_exchange_database/GrandExchangeDatabaseTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.RunescapeApisSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['grand_exchange_database01', 'grand_exchange_database02', 'grand_exchange_database03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'RUNESCAPE_APIS_TEST_GRAND_EXCHANGE_DATABASE_ENTID': idmap,
        'RUNESCAPE_APIS_TEST_LIVE': 'FALSE',
        'RUNESCAPE_APIS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['RUNESCAPE_APIS_TEST_GRAND_EXCHANGE_DATABASE_ENTID'];
    const live = 'TRUE' === env.RUNESCAPE_APIS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['RUNESCAPE_APIS_TEST_GRAND_EXCHANGE_DATABASE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.RunescapeApisSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.RUNESCAPE_APIS_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=GrandExchangeDatabaseEntity.test.js.map