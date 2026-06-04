# RunescapeApis SDK configuration


def make_config():
    return {
        "main": {
            "name": "RunescapeApis",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "current",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "daily",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "description",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "icon",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "icon_large",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "item",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "last_config_update_runeday",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 8,
          },
          {
            "name": "letter",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 9,
          },
          {
            "name": "member",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 10,
          },
          {
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 11,
          },
          {
            "name": "today",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 12,
          },
          {
            "name": "type",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 13,
          },
          {
            "name": "type_icon",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 14,
          },
        ],
        "name": "grand_exchange_database",
        "op": {
          "list": {
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
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "category",
                      "orig": "category",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/m=itemdb_rs/api/catalogue/items.json",
                "parts": [
                  "m=itemdb_rs",
                  "api",
                  "catalogue",
                  "items.json",
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
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
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
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/m=itemdb_rs/api/catalogue/category.json",
                "parts": [
                  "m=itemdb_rs",
                  "api",
                  "catalogue",
                  "category.json",
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
                "active": True,
                "index$": 1,
              },
            ],
            "input": "data",
            "key$": "list",
          },
          "load": {
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
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/m=itemdb_rs/obj_big.gif",
                "parts": [
                  "m=itemdb_rs",
                  "obj_big.gif",
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
                "active": True,
                "index$": 0,
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
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/m=itemdb_rs/obj_sprite.gif",
                "parts": [
                  "m=itemdb_rs",
                  "obj_sprite.gif",
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
                "active": True,
                "index$": 1,
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
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/m=itemdb_rs/api/catalogue/detail.json",
                "parts": [
                  "m=itemdb_rs",
                  "api",
                  "catalogue",
                  "detail.json",
                ],
                "select": {
                  "exist": [
                    "item",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 2,
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
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/m=itemdb_rs/api/graph/{itemId}.json",
                "parts": [
                  "m=itemdb_rs",
                  "api",
                  "graph",
                  "{itemId}.json",
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
                "active": True,
                "index$": 3,
              },
              {
                "method": "GET",
                "orig": "/m=itemdb_rs/api/info.json",
                "parts": [
                  "m=itemdb_rs",
                  "api",
                  "info.json",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 4,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "graph",
            ],
          ],
        },
      },
      "old_school_grand_exchange": {
        "fields": [
          {
            "name": "current",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "description",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "icon",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "icon_large",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "member",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "today",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 7,
          },
          {
            "name": "type",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 8,
          },
          {
            "name": "type_icon",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 9,
          },
        ],
        "name": "old_school_grand_exchange",
        "op": {
          "list": {
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
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "category",
                      "orig": "category",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/m=itemdb_oldschool/api/catalogue/items.json",
                "parts": [
                  "m=itemdb_oldschool",
                  "api",
                  "catalogue",
                  "items.json",
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
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
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
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "rank",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "score",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
        ],
        "name": "player_ranking",
        "op": {
          "list": {
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
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "size",
                      "orig": "size",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "kind": "query",
                      "name": "table",
                      "orig": "table",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/m=hiscore/ranking.json",
                "parts": [
                  "m=hiscore",
                  "ranking.json",
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
