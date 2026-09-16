# RunescapeApis SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "RunescapeApis",
            "slug": "runescape-apis",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://secure.runescape.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "grand_exchange_database": {},
                "old_school_grand_exchange": {},
                "player_ranking": {},
            },
        },
        "entity": {
      "grand_exchange_database": {
        "fields": [
          {
            "name": "average",
            "short": "30-day moving average with timestamp as key",
            "type": "`$OBJECT`",
          },
          {
            "name": "current",
            "type": "`$OBJECT`",
            "union": {
              "branches": 2,
              "count": 1,
              "depth": 2,
            },
          },
          {
            "name": "daily",
            "short": "Daily prices with timestamp as key",
            "type": "`$OBJECT`",
          },
          {
            "name": "day180",
            "type": "`$OBJECT`",
          },
          {
            "name": "day30",
            "type": "`$OBJECT`",
          },
          {
            "name": "day90",
            "type": "`$OBJECT`",
          },
          {
            "name": "description",
            "short": "The item examine text",
            "type": "`$STRING`",
          },
          {
            "name": "icon",
            "short": "The item sprite image URL",
            "type": "`$STRING`",
          },
          {
            "name": "icon_large",
            "short": "The item detail image URL",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "The ItemID",
            "type": "`$INTEGER`",
          },
          {
            "name": "items",
            "short": "The number of items starting with this letter",
            "type": "`$INTEGER`",
          },
          {
            "name": "lastConfigUpdateRuneday",
            "short": "The runedate when the database was last updated",
            "type": "`$INTEGER`",
          },
          {
            "name": "letter",
            "short": "The first letter of an item",
            "type": "`$STRING`",
          },
          {
            "name": "members",
            "short": "Whether the item is members-only",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "The item name",
            "type": "`$STRING`",
          },
          {
            "name": "today",
            "type": "`$OBJECT`",
            "union": {
              "branches": 2,
              "count": 1,
              "depth": 2,
            },
          },
          {
            "name": "type",
            "short": "The item category",
            "type": "`$STRING`",
          },
          {
            "name": "typeIcon",
            "short": "The item category icon URL",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "category",
                      "orig": "category",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/m=itemdb_rs/api/catalogue/items.json",
                "segments": [
                  {
                    "lit": "m=itemdb_rs",
                  },
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "catalogue",
                  },
                  {
                    "lit": "items.json",
                  },
                ],
                "select": {
                  "exist": [
                    "alpha",
                    "category",
                    "page",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "parts": [
                  "m=itemdb_rs",
                  "api",
                  "catalogue",
                  "items.json",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "category",
                      "orig": "category",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/m=itemdb_rs/api/catalogue/category.json",
                "segments": [
                  {
                    "lit": "m=itemdb_rs",
                  },
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "catalogue",
                  },
                  {
                    "lit": "category.json",
                  },
                ],
                "select": {
                  "exist": [
                    "category",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "m=itemdb_rs",
                  "api",
                  "catalogue",
                  "category.json",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/m=itemdb_rs/obj_big.gif",
                "segments": [
                  {
                    "lit": "m=itemdb_rs",
                  },
                  {
                    "lit": "obj_big.gif",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "m=itemdb_rs",
                  "obj_big.gif",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/m=itemdb_rs/obj_sprite.gif",
                "segments": [
                  {
                    "lit": "m=itemdb_rs",
                  },
                  {
                    "lit": "obj_sprite.gif",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "m=itemdb_rs",
                  "obj_sprite.gif",
                ],
              },
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "item",
                      "orig": "item",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/m=itemdb_rs/api/catalogue/detail.json",
                "segments": [
                  {
                    "lit": "m=itemdb_rs",
                  },
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "catalogue",
                  },
                  {
                    "lit": "detail.json",
                  },
                ],
                "select": {
                  "exist": [
                    "item",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.item`",
                },
                "parts": [
                  "m=itemdb_rs",
                  "api",
                  "catalogue",
                  "detail.json",
                ],
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "item_id",
                      "orig": "item_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/m=itemdb_rs/api/graph/{itemId}.json",
                "segments": [
                  {
                    "lit": "m=itemdb_rs",
                  },
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "graph",
                  },
                  {
                    "lit": "{itemId}.json",
                  },
                ],
                "select": {
                  "exist": [
                    "item_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "m=itemdb_rs",
                  "api",
                  "graph",
                  "{itemId}.json",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/m=itemdb_rs/api/info.json",
                "segments": [
                  {
                    "lit": "m=itemdb_rs",
                  },
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "info.json",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "m=itemdb_rs",
                  "api",
                  "info.json",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "old_school_grand_exchange": {
        "fields": [
          {
            "name": "current",
            "type": "`$OBJECT`",
            "union": {
              "branches": 2,
              "count": 1,
              "depth": 2,
            },
          },
          {
            "name": "description",
            "short": "The item examine text",
            "type": "`$STRING`",
          },
          {
            "name": "icon",
            "short": "The item sprite image URL",
            "type": "`$STRING`",
          },
          {
            "name": "icon_large",
            "short": "The item detail image URL",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "The ItemID",
            "type": "`$INTEGER`",
          },
          {
            "name": "members",
            "short": "Whether the item is members-only",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "The item name",
            "type": "`$STRING`",
          },
          {
            "name": "today",
            "type": "`$OBJECT`",
            "union": {
              "branches": 2,
              "count": 1,
              "depth": 2,
            },
          },
          {
            "name": "type",
            "short": "The item category",
            "type": "`$STRING`",
          },
          {
            "name": "typeIcon",
            "short": "The item category icon URL",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "category",
                      "orig": "category",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/m=itemdb_oldschool/api/catalogue/items.json",
                "segments": [
                  {
                    "lit": "m=itemdb_oldschool",
                  },
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "catalogue",
                  },
                  {
                    "lit": "items.json",
                  },
                ],
                "select": {
                  "exist": [
                    "alpha",
                    "category",
                    "page",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "parts": [
                  "m=itemdb_oldschool",
                  "api",
                  "catalogue",
                  "items.json",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "player_ranking": {
        "fields": [
          {
            "name": "name",
            "short": "The player's username",
            "type": "`$STRING`",
          },
          {
            "name": "rank",
            "short": "The player's rank",
            "type": "`$STRING`",
          },
          {
            "name": "score",
            "short": "The player's score or experience",
            "type": "`$STRING`",
          },
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "size",
                      "orig": "size",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "table",
                      "orig": "table",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/m=hiscore/ranking.json",
                "segments": [
                  {
                    "lit": "m=hiscore",
                  },
                  {
                    "lit": "ranking.json",
                  },
                ],
                "select": {
                  "exist": [
                    "category",
                    "size",
                    "table",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "m=hiscore",
                  "ranking.json",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
