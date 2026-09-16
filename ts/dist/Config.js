"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'RunescapeApis',
        slug: "runescape-apis",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://secure.runescape.com",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            grand_exchange_database: {},
            old_school_grand_exchange: {},
            player_ranking: {},
        }
    };
    entity = {
        "grand_exchange_database": {
            "fields": [
                {
                    "name": "average",
                    "short": "30-day moving average with timestamp as key",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "current",
                    "type": "`$OBJECT`",
                    "union": {
                        "branches": 2,
                        "count": 1,
                        "depth": 2
                    }
                },
                {
                    "name": "daily",
                    "short": "Daily prices with timestamp as key",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "day180",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "day30",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "day90",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "description",
                    "short": "The item examine text",
                    "type": "`$STRING`"
                },
                {
                    "name": "icon",
                    "short": "The item sprite image URL",
                    "type": "`$STRING`"
                },
                {
                    "name": "icon_large",
                    "short": "The item detail image URL",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "The ItemID",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "items",
                    "short": "The number of items starting with this letter",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "lastConfigUpdateRuneday",
                    "short": "The runedate when the database was last updated",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "letter",
                    "short": "The first letter of an item",
                    "type": "`$STRING`"
                },
                {
                    "name": "members",
                    "short": "Whether the item is members-only",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "short": "The item name",
                    "type": "`$STRING`"
                },
                {
                    "name": "today",
                    "type": "`$OBJECT`",
                    "union": {
                        "branches": 2,
                        "count": 1,
                        "depth": 2
                    }
                },
                {
                    "name": "type",
                    "short": "The item category",
                    "type": "`$STRING`"
                },
                {
                    "name": "typeIcon",
                    "short": "The item category icon URL",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "grand_exchange_database",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alpha",
                                        "orig": "alpha",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "category",
                                        "orig": "category",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "page",
                                        "orig": "page",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/m=itemdb_rs/api/catalogue/items.json",
                            "segments": [
                                {
                                    "lit": "m=itemdb_rs"
                                },
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "catalogue"
                                },
                                {
                                    "lit": "items.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alpha",
                                    "category",
                                    "page"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.items`"
                            },
                            "parts": [
                                "m=itemdb_rs",
                                "api",
                                "catalogue",
                                "items.json"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "category",
                                        "orig": "category",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/m=itemdb_rs/api/catalogue/category.json",
                            "segments": [
                                {
                                    "lit": "m=itemdb_rs"
                                },
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "catalogue"
                                },
                                {
                                    "lit": "category.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "category"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "m=itemdb_rs",
                                "api",
                                "catalogue",
                                "category.json"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/m=itemdb_rs/obj_big.gif",
                            "segments": [
                                {
                                    "lit": "m=itemdb_rs"
                                },
                                {
                                    "lit": "obj_big.gif"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "m=itemdb_rs",
                                "obj_big.gif"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/m=itemdb_rs/obj_sprite.gif",
                            "segments": [
                                {
                                    "lit": "m=itemdb_rs"
                                },
                                {
                                    "lit": "obj_sprite.gif"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "m=itemdb_rs",
                                "obj_sprite.gif"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "item",
                                        "orig": "item",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/m=itemdb_rs/api/catalogue/detail.json",
                            "segments": [
                                {
                                    "lit": "m=itemdb_rs"
                                },
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "catalogue"
                                },
                                {
                                    "lit": "detail.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "item"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.item`"
                            },
                            "parts": [
                                "m=itemdb_rs",
                                "api",
                                "catalogue",
                                "detail.json"
                            ]
                        },
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "item_id",
                                        "orig": "item_id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/m=itemdb_rs/api/graph/{itemId}.json",
                            "segments": [
                                {
                                    "lit": "m=itemdb_rs"
                                },
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "graph"
                                },
                                {
                                    "lit": "{itemId}.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "item_id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "m=itemdb_rs",
                                "api",
                                "graph",
                                "{itemId}.json"
                            ]
                        },
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/m=itemdb_rs/api/info.json",
                            "segments": [
                                {
                                    "lit": "m=itemdb_rs"
                                },
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "info.json"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "m=itemdb_rs",
                                "api",
                                "info.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "old_school_grand_exchange": {
            "fields": [
                {
                    "name": "current",
                    "type": "`$OBJECT`",
                    "union": {
                        "branches": 2,
                        "count": 1,
                        "depth": 2
                    }
                },
                {
                    "name": "description",
                    "short": "The item examine text",
                    "type": "`$STRING`"
                },
                {
                    "name": "icon",
                    "short": "The item sprite image URL",
                    "type": "`$STRING`"
                },
                {
                    "name": "icon_large",
                    "short": "The item detail image URL",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "The ItemID",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "members",
                    "short": "Whether the item is members-only",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "short": "The item name",
                    "type": "`$STRING`"
                },
                {
                    "name": "today",
                    "type": "`$OBJECT`",
                    "union": {
                        "branches": 2,
                        "count": 1,
                        "depth": 2
                    }
                },
                {
                    "name": "type",
                    "short": "The item category",
                    "type": "`$STRING`"
                },
                {
                    "name": "typeIcon",
                    "short": "The item category icon URL",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "old_school_grand_exchange",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "alpha",
                                        "orig": "alpha",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "category",
                                        "orig": "category",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "page",
                                        "orig": "page",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/m=itemdb_oldschool/api/catalogue/items.json",
                            "segments": [
                                {
                                    "lit": "m=itemdb_oldschool"
                                },
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "catalogue"
                                },
                                {
                                    "lit": "items.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "alpha",
                                    "category",
                                    "page"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.items`"
                            },
                            "parts": [
                                "m=itemdb_oldschool",
                                "api",
                                "catalogue",
                                "items.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "player_ranking": {
            "fields": [
                {
                    "name": "name",
                    "short": "The player's username",
                    "type": "`$STRING`"
                },
                {
                    "name": "rank",
                    "short": "The player's rank",
                    "type": "`$STRING`"
                },
                {
                    "name": "score",
                    "short": "The player's score or experience",
                    "type": "`$STRING`"
                }
            ],
            "name": "player_ranking",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "category",
                                        "orig": "category",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "size",
                                        "orig": "size",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "table",
                                        "orig": "table",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/m=hiscore/ranking.json",
                            "segments": [
                                {
                                    "lit": "m=hiscore"
                                },
                                {
                                    "lit": "ranking.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "category",
                                    "size",
                                    "table"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "m=hiscore",
                                "ranking.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map