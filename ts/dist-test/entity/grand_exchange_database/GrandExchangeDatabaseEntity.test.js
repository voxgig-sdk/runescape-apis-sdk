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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "average": { "a": true, "h": "Average", "n": "average", "r": false, "sh": "30-day moving average with timestamp as key", "t": "`$OBJECT`", "key$": "average", "index$": 0 }, "current": { "a": true, "h": "Current", "n": "current", "r": false, "t": "`$OBJECT`", "union": { "branches": 2, "count": 1, "depth": 2 }, "key$": "current", "index$": 1 }, "daily": { "a": true, "h": "Daily", "n": "daily", "r": false, "sh": "Daily prices with timestamp as key", "t": "`$OBJECT`", "key$": "daily", "index$": 2 }, "day180": { "a": true, "h": "Day180", "n": "day180", "r": false, "t": "`$OBJECT`", "key$": "day180", "index$": 3 }, "day30": { "a": true, "h": "Day30", "n": "day30", "r": false, "t": "`$OBJECT`", "key$": "day30", "index$": 4 }, "day90": { "a": true, "h": "Day90", "n": "day90", "r": false, "t": "`$OBJECT`", "key$": "day90", "index$": 5 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "The item examine text", "t": "`$STRING`", "key$": "description", "index$": 6 }, "icon": { "a": true, "h": "Icon", "n": "icon", "r": false, "sh": "The item sprite image URL", "t": "`$STRING`", "key$": "icon", "index$": 7 }, "icon_large": { "a": true, "h": "Icon Large", "n": "icon_large", "r": false, "sh": "The item detail image URL", "t": "`$STRING`", "key$": "icon_large", "index$": 8 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "The ItemID", "t": "`$INTEGER`", "key$": "id", "index$": 9 }, "items": { "a": true, "h": "Items", "n": "items", "r": false, "sh": "The number of items starting with this letter", "t": "`$INTEGER`", "key$": "items", "index$": 10 }, "lastConfigUpdateRuneday": { "a": true, "h": "Last Config Update Runeday", "n": "lastConfigUpdateRuneday", "r": false, "sh": "The runedate when the database was last updated", "t": "`$INTEGER`", "key$": "lastConfigUpdateRuneday", "index$": 11 }, "letter": { "a": true, "h": "Letter", "n": "letter", "r": false, "sh": "The first letter of an item", "t": "`$STRING`", "key$": "letter", "index$": 12 }, "members": { "a": true, "h": "Members", "n": "members", "r": false, "sh": "Whether the item is members-only", "t": "`$STRING`", "key$": "members", "index$": 13 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "The item name", "t": "`$STRING`", "key$": "name", "index$": 14 }, "today": { "a": true, "h": "Today", "n": "today", "r": false, "t": "`$OBJECT`", "union": { "branches": 2, "count": 1, "depth": 2 }, "key$": "today", "index$": 15 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "The item category", "t": "`$STRING`", "key$": "type", "index$": 16 }, "typeIcon": { "a": true, "h": "Type Icon", "n": "typeIcon", "r": false, "sh": "The item category icon URL", "t": "`$STRING`", "key$": "typeIcon", "index$": 17 } }, "id": { "field": "id", "name": "id" }, "name": "grand_exchange_database", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /m=itemdb_rs/api/catalogue/items.json", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "alpha", "or": "alpha", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "category", "or": "category", "r": true, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "page", "or": "page", "r": true, "t": "`$INTEGER`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/m=itemdb_rs/api/catalogue/items.json", "q": { "exist": ["alpha", "category", "page"] }, "r": {}, "s": [{ "lit": "m=itemdb_rs" }, { "lit": "api" }, { "lit": "catalogue" }, { "lit": "items.json" }], "t": { "req": "`reqdata`", "res": "`body.items`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /m=itemdb_rs/api/catalogue/category.json", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "category", "or": "category", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/m=itemdb_rs/api/catalogue/category.json", "q": { "exist": ["category"] }, "r": {}, "s": [{ "lit": "m=itemdb_rs" }, { "lit": "api" }, { "lit": "catalogue" }, { "lit": "category.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /m=itemdb_rs/obj_big.gif", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/m=itemdb_rs/obj_big.gif", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "m=itemdb_rs" }, { "lit": "obj_big.gif" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /m=itemdb_rs/obj_sprite.gif", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/m=itemdb_rs/obj_sprite.gif", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "m=itemdb_rs" }, { "lit": "obj_sprite.gif" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /m=itemdb_rs/api/catalogue/detail.json", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "item", "or": "item", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/m=itemdb_rs/api/catalogue/detail.json", "q": { "exist": ["item"] }, "r": {}, "s": [{ "lit": "m=itemdb_rs" }, { "lit": "api" }, { "lit": "catalogue" }, { "lit": "detail.json" }], "t": { "req": "`reqdata`", "res": "`body.item`" }, "index$": 2 }, { "a": true, "co": { "id": "GET /m=itemdb_rs/api/graph/{itemId}.json", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "item_id", "or": "item_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/m=itemdb_rs/api/graph/{itemId}.json", "q": { "exist": ["item_id"] }, "r": {}, "s": [{ "lit": "m=itemdb_rs" }, { "lit": "api" }, { "lit": "graph" }, { "lit": "{itemId}.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /m=itemdb_rs/api/info.json", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/m=itemdb_rs/api/info.json", "q": {}, "r": {}, "s": [{ "lit": "m=itemdb_rs" }, { "lit": "api" }, { "lit": "info.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "grand_exchange_database", "name__orig": "grand_exchange_database", "Name": "GrandExchangeDatabase", "name_": "grand_exchange_database", "name-": "grand-exchange-database", "NAME": "GRAND_EXCHANGE_DATABASE", "index$": 0 }, { "active": true, "entity": "grand_exchange_database", "key$": "BasicGrandExchangeDatabaseFlow", "kind": "basic", "name": "BasicGrandExchangeDatabaseFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "grand_exchange_database_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "grand_exchange_database_ref01", "srcdatavar": "grand_exchange_database_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-grand_exchange_database_ref01" } }], "index$": 1 }] }, 'GrandExchangeDatabase', { "GET /m=itemdb_rs/api/catalogue/items.json": { "protocol": "http", "operationId": "getItemsByCategory", "responses": { "200": { "description": "Successful response with items list", "content": { "application/json": { "schema": { "type": "object", "properties": { "total": { "description": "The total number of items in the category", "key$": "total", "type": "integer" }, "items": { "items": { "properties": { "current": { "properties": { "price": { "description": "The item trade price (can be integer or string)", "oneOf": [{ "type": "integer" }, { "type": "string" }] }, "trend": { "description": "The price trend direction", "enum": ["positive", "negative", "neutral"], "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/PriceTrend", "key$": "current" }, "description": { "description": "The item examine text", "type": "string", "key$": "description" }, "icon": { "description": "The item sprite image URL", "type": "string", "key$": "icon" }, "icon_large": { "description": "The item detail image URL", "type": "string", "key$": "icon_large" }, "id": { "description": "The ItemID", "type": "integer", "key$": "id" }, "members": { "description": "Whether the item is members-only", "enum": ["true", "false"], "type": "string", "key$": "members" }, "name": { "description": "The item name", "type": "string", "key$": "name" }, "today": { "properties": { "price": { "description": "The item trade price (can be integer or string)", "oneOf": [{ "type": "integer" }, { "type": "string" }] }, "trend": { "description": "The price trend direction", "enum": ["positive", "negative", "neutral"], "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/PriceTrend", "key$": "today" }, "type": { "description": "The item category", "type": "string", "key$": "type" }, "typeIcon": { "description": "The item category icon URL", "type": "string", "key$": "typeIcon" } }, "type": "object", "x-ref": "#/components/schemas/Item", "index$": 0 }, "key$": "items", "type": "array" } } } } } } }, "parameters": [{ "name": "category", "in": "query", "required": true, "description": "The category identification number (0-43)", "schema": { "type": "integer", "minimum": 0, "maximum": 43 }, "index$": 0 }, { "name": "alpha", "in": "query", "required": true, "description": "The starting letter for the items (lowercase). Use %23 for numbers.", "schema": { "type": "string", "pattern": "^[a-z]$|^%23$" }, "index$": 1 }, { "name": "page", "in": "query", "required": true, "description": "The page number beginning at 1", "schema": { "type": "integer", "minimum": 1 }, "index$": 2 }], "securitySource": "unspecified" }, "GET /m=itemdb_rs/api/catalogue/category.json": { "protocol": "http", "operationId": "getCategoryInfo", "responses": { "200": { "description": "Successful response with category information", "content": { "application/json": { "schema": { "type": "object", "properties": { "types": { "items": { "type": "string" }, "key$": "types", "type": "array" }, "alpha": { "items": { "properties": { "items": { "description": "The number of items starting with this letter", "type": "integer", "key$": "items" }, "letter": { "description": "The first letter of an item", "type": "string", "key$": "letter" } }, "type": "object", "index$": 0 }, "key$": "alpha", "type": "array" } } } } } } }, "parameters": [{ "name": "category", "in": "query", "required": true, "description": "The category identification number (0-43)", "schema": { "type": "integer", "minimum": 0, "maximum": 43 }, "index$": 0 }], "securitySource": "unspecified" }, "GET /m=itemdb_rs/obj_big.gif": { "protocol": "http", "operationId": "getItemLargeImage", "responses": { "200": { "description": "Successful response with item image", "content": { "image/gif": { "schema": { "type": "string", "format": "binary" } } } } }, "parameters": [{ "name": "id", "in": "query", "required": true, "description": "The ItemID", "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" }, "GET /m=itemdb_rs/obj_sprite.gif": { "protocol": "http", "operationId": "getItemSpriteImage", "responses": { "200": { "description": "Successful response with item sprite", "content": { "image/gif": { "schema": { "type": "string", "format": "binary" } } } } }, "parameters": [{ "name": "id", "in": "query", "required": true, "description": "The ItemID", "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" }, "GET /m=itemdb_rs/api/catalogue/detail.json": { "protocol": "http", "operationId": "getItemDetail", "responses": { "200": { "description": "Successful response with item details", "content": { "application/json": { "schema": { "type": "object", "properties": { "item": { "key$": "item", "properties": { "current": { "properties": { "price": { "description": "The item trade price (can be integer or string)", "oneOf": [{ "type": "integer" }, { "type": "string" }] }, "trend": { "description": "The price trend direction", "enum": ["positive", "negative", "neutral"], "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/PriceTrend", "key$": "current" }, "day180": { "properties": { "change": { "description": "The percentage change in price", "type": "string" }, "trend": { "description": "The price trend direction", "enum": ["positive", "negative", "neutral"], "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/PriceChange", "key$": "day180" }, "day30": { "properties": { "change": { "description": "The percentage change in price", "type": "string" }, "trend": { "description": "The price trend direction", "enum": ["positive", "negative", "neutral"], "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/PriceChange", "key$": "day30" }, "day90": { "properties": { "change": { "description": "The percentage change in price", "type": "string" }, "trend": { "description": "The price trend direction", "enum": ["positive", "negative", "neutral"], "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/PriceChange", "key$": "day90" }, "description": { "description": "The item examine text", "type": "string", "key$": "description" }, "icon": { "description": "The item sprite image URL", "type": "string", "key$": "icon" }, "icon_large": { "description": "The item detail image URL", "type": "string", "key$": "icon_large" }, "id": { "description": "The ItemID", "type": "integer", "key$": "id" }, "members": { "description": "Whether the item is members-only", "enum": ["true", "false"], "type": "string", "key$": "members" }, "name": { "description": "The item name", "type": "string", "key$": "name" }, "today": { "properties": { "price": { "description": "The item trade price (can be integer or string)", "oneOf": [{ "type": "integer" }, { "type": "string" }] }, "trend": { "description": "The price trend direction", "enum": ["positive", "negative", "neutral"], "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/PriceTrend", "key$": "today" }, "type": { "description": "The item category", "type": "string", "key$": "type" }, "typeIcon": { "description": "The item category icon URL", "type": "string", "key$": "typeIcon" } }, "type": "object", "x-ref": "#/components/schemas/ItemDetail", "index$": 0 } } } } } } }, "parameters": [{ "name": "item", "in": "query", "required": true, "description": "The ItemID", "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" }, "GET /m=itemdb_rs/api/graph/{itemId}.json": { "protocol": "http", "operationId": "getItemGraph", "responses": { "200": { "description": "Successful response with price history", "content": { "application/json": { "schema": { "type": "object", "properties": { "daily": { "additionalProperties": { "type": "integer" }, "description": "Daily prices with timestamp as key", "key$": "daily", "type": "object" }, "average": { "additionalProperties": { "type": "integer" }, "description": "30-day moving average with timestamp as key", "key$": "average", "type": "object" } }, "index$": 0 } } } } }, "parameters": [{ "name": "itemId", "in": "path", "required": true, "description": "The ItemID", "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" }, "GET /m=itemdb_rs/api/info.json": { "protocol": "http", "operationId": "getGEInfo", "responses": { "200": { "description": "Successful response with database update information", "content": { "application/json": { "schema": { "type": "object", "properties": { "lastConfigUpdateRuneday": { "description": "The runedate when the database was last updated", "key$": "lastConfigUpdateRuneday", "type": "integer" } }, "index$": 0 } } } } }, "parameters": [], "securitySource": "unspecified" } });
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