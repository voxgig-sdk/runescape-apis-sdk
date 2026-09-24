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
            "title": "Average",
            "type": "`$OBJECT`",
            "short": "30-day moving average with timestamp as key",
          },
          {
            "name": "current",
            "title": "Current",
            "type": "`$OBJECT`",
          },
          {
            "name": "daily",
            "title": "Daily",
            "type": "`$OBJECT`",
            "short": "Daily prices with timestamp as key",
          },
          {
            "name": "day180",
            "title": "Day180",
            "type": "`$OBJECT`",
          },
          {
            "name": "day30",
            "title": "Day30",
            "type": "`$OBJECT`",
          },
          {
            "name": "day90",
            "title": "Day90",
            "type": "`$OBJECT`",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "The item examine text",
          },
          {
            "name": "icon",
            "title": "Icon",
            "type": "`$STRING`",
            "short": "The item sprite image URL",
          },
          {
            "name": "icon_large",
            "title": "Icon Large",
            "type": "`$STRING`",
            "short": "The item detail image URL",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "short": "The ItemID",
          },
          {
            "name": "items",
            "title": "Items",
            "type": "`$INTEGER`",
            "short": "The number of items starting with this letter",
          },
          {
            "name": "lastConfigUpdateRuneday",
            "title": "Last Config Update Runeday",
            "type": "`$INTEGER`",
            "short": "The runedate when the database was last updated",
          },
          {
            "name": "letter",
            "title": "Letter",
            "type": "`$STRING`",
            "short": "The first letter of an item",
          },
          {
            "name": "members",
            "title": "Members",
            "type": "`$STRING`",
            "short": "Whether the item is members-only",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "The item name",
          },
          {
            "name": "today",
            "title": "Today",
            "type": "`$OBJECT`",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "short": "The item category",
          },
          {
            "name": "typeIcon",
            "title": "Type Icon",
            "type": "`$STRING`",
            "short": "The item category icon URL",
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
                "parts": [
                  "m=itemdb_rs",
                  "api",
                  "catalogue",
                  "items.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "query": [
                    {
                      "name": "alpha",
                      "orig": "alpha",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "category",
                      "orig": "category",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "alpha",
                    "category",
                    "page",
                  ],
                },
              },
              {
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
                "parts": [
                  "m=itemdb_rs",
                  "api",
                  "catalogue",
                  "category.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "category",
                      "orig": "category",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "category",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
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
                "parts": [
                  "m=itemdb_rs",
                  "obj_big.gif",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
              {
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
                "parts": [
                  "m=itemdb_rs",
                  "obj_sprite.gif",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
              {
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
                "parts": [
                  "m=itemdb_rs",
                  "api",
                  "catalogue",
                  "detail.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.item`",
                },
                "args": {
                  "query": [
                    {
                      "name": "item",
                      "orig": "item",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "item",
                  ],
                },
              },
              {
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
                "parts": [
                  "m=itemdb_rs",
                  "api",
                  "graph",
                  "{itemId}.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "item_id",
                      "orig": "item_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "item_id",
                  ],
                },
              },
              {
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
                "parts": [
                  "m=itemdb_rs",
                  "api",
                  "info.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
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
            "title": "Current",
            "type": "`$OBJECT`",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "The item examine text",
          },
          {
            "name": "icon",
            "title": "Icon",
            "type": "`$STRING`",
            "short": "The item sprite image URL",
          },
          {
            "name": "icon_large",
            "title": "Icon Large",
            "type": "`$STRING`",
            "short": "The item detail image URL",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "short": "The ItemID",
          },
          {
            "name": "members",
            "title": "Members",
            "type": "`$STRING`",
            "short": "Whether the item is members-only",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "The item name",
          },
          {
            "name": "today",
            "title": "Today",
            "type": "`$OBJECT`",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "short": "The item category",
          },
          {
            "name": "typeIcon",
            "title": "Type Icon",
            "type": "`$STRING`",
            "short": "The item category icon URL",
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
                "parts": [
                  "m=itemdb_oldschool",
                  "api",
                  "catalogue",
                  "items.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "query": [
                    {
                      "name": "alpha",
                      "orig": "alpha",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "category",
                      "orig": "category",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "alpha",
                    "category",
                    "page",
                  ],
                },
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
            "title": "Name",
            "type": "`$STRING`",
            "short": "The player's username",
          },
          {
            "name": "rank",
            "title": "Rank",
            "type": "`$STRING`",
            "short": "The player's rank",
          },
          {
            "name": "score",
            "title": "Score",
            "type": "`$STRING`",
            "short": "The player's score or experience",
          },
        ],
        "name": "player_ranking",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
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
                "parts": [
                  "m=hiscore",
                  "ranking.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "category",
                      "orig": "category",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "size",
                      "orig": "size",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "table",
                      "orig": "table",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "category",
                    "size",
                    "table",
                  ],
                },
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
