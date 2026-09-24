# RunescapeApis SDK configuration

module RunescapeApisConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "RunescapeApis",
        "slug" => "runescape-apis",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://secure.runescape.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "grand_exchange_database" => {},
          "old_school_grand_exchange" => {},
          "player_ranking" => {},
        },
      },
      "entity" => {
        "grand_exchange_database" => {
          "fields" => [
            {
              "name" => "average",
              "title" => "Average",
              "type" => "`$OBJECT`",
              "short" => "30-day moving average with timestamp as key",
            },
            {
              "name" => "current",
              "title" => "Current",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "daily",
              "title" => "Daily",
              "type" => "`$OBJECT`",
              "short" => "Daily prices with timestamp as key",
            },
            {
              "name" => "day180",
              "title" => "Day180",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "day30",
              "title" => "Day30",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "day90",
              "title" => "Day90",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "description",
              "title" => "Description",
              "type" => "`$STRING`",
              "short" => "The item examine text",
            },
            {
              "name" => "icon",
              "title" => "Icon",
              "type" => "`$STRING`",
              "short" => "The item sprite image URL",
            },
            {
              "name" => "icon_large",
              "title" => "Icon Large",
              "type" => "`$STRING`",
              "short" => "The item detail image URL",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "short" => "The ItemID",
            },
            {
              "name" => "items",
              "title" => "Items",
              "type" => "`$INTEGER`",
              "short" => "The number of items starting with this letter",
            },
            {
              "name" => "lastConfigUpdateRuneday",
              "title" => "Last Config Update Runeday",
              "type" => "`$INTEGER`",
              "short" => "The runedate when the database was last updated",
            },
            {
              "name" => "letter",
              "title" => "Letter",
              "type" => "`$STRING`",
              "short" => "The first letter of an item",
            },
            {
              "name" => "members",
              "title" => "Members",
              "type" => "`$STRING`",
              "short" => "Whether the item is members-only",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "The item name",
            },
            {
              "name" => "today",
              "title" => "Today",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "type",
              "title" => "Type",
              "type" => "`$STRING`",
              "short" => "The item category",
            },
            {
              "name" => "typeIcon",
              "title" => "Type Icon",
              "type" => "`$STRING`",
              "short" => "The item category icon URL",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "grand_exchange_database",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/m=itemdb_rs/api/catalogue/items.json",
                  "segments" => [
                    {
                      "lit" => "m=itemdb_rs",
                    },
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "catalogue",
                    },
                    {
                      "lit" => "items.json",
                    },
                  ],
                  "parts" => [
                    "m=itemdb_rs",
                    "api",
                    "catalogue",
                    "items.json",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.items`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "alpha",
                        "orig" => "alpha",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "category",
                        "orig" => "category",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "alpha",
                      "category",
                      "page",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/m=itemdb_rs/api/catalogue/category.json",
                  "segments" => [
                    {
                      "lit" => "m=itemdb_rs",
                    },
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "catalogue",
                    },
                    {
                      "lit" => "category.json",
                    },
                  ],
                  "parts" => [
                    "m=itemdb_rs",
                    "api",
                    "catalogue",
                    "category.json",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "category",
                        "orig" => "category",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "category",
                    ],
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/m=itemdb_rs/obj_big.gif",
                  "segments" => [
                    {
                      "lit" => "m=itemdb_rs",
                    },
                    {
                      "lit" => "obj_big.gif",
                    },
                  ],
                  "parts" => [
                    "m=itemdb_rs",
                    "obj_big.gif",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/m=itemdb_rs/obj_sprite.gif",
                  "segments" => [
                    {
                      "lit" => "m=itemdb_rs",
                    },
                    {
                      "lit" => "obj_sprite.gif",
                    },
                  ],
                  "parts" => [
                    "m=itemdb_rs",
                    "obj_sprite.gif",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/m=itemdb_rs/api/catalogue/detail.json",
                  "segments" => [
                    {
                      "lit" => "m=itemdb_rs",
                    },
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "catalogue",
                    },
                    {
                      "lit" => "detail.json",
                    },
                  ],
                  "parts" => [
                    "m=itemdb_rs",
                    "api",
                    "catalogue",
                    "detail.json",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.item`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "item",
                        "orig" => "item",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "item",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/m=itemdb_rs/api/graph/{itemId}.json",
                  "segments" => [
                    {
                      "lit" => "m=itemdb_rs",
                    },
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "graph",
                    },
                    {
                      "lit" => "{itemId}.json",
                    },
                  ],
                  "parts" => [
                    "m=itemdb_rs",
                    "api",
                    "graph",
                    "{itemId}.json",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "item_id",
                        "orig" => "item_id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "item_id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/m=itemdb_rs/api/info.json",
                  "segments" => [
                    {
                      "lit" => "m=itemdb_rs",
                    },
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "info.json",
                    },
                  ],
                  "parts" => [
                    "m=itemdb_rs",
                    "api",
                    "info.json",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "old_school_grand_exchange" => {
          "fields" => [
            {
              "name" => "current",
              "title" => "Current",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "description",
              "title" => "Description",
              "type" => "`$STRING`",
              "short" => "The item examine text",
            },
            {
              "name" => "icon",
              "title" => "Icon",
              "type" => "`$STRING`",
              "short" => "The item sprite image URL",
            },
            {
              "name" => "icon_large",
              "title" => "Icon Large",
              "type" => "`$STRING`",
              "short" => "The item detail image URL",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "short" => "The ItemID",
            },
            {
              "name" => "members",
              "title" => "Members",
              "type" => "`$STRING`",
              "short" => "Whether the item is members-only",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "The item name",
            },
            {
              "name" => "today",
              "title" => "Today",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "type",
              "title" => "Type",
              "type" => "`$STRING`",
              "short" => "The item category",
            },
            {
              "name" => "typeIcon",
              "title" => "Type Icon",
              "type" => "`$STRING`",
              "short" => "The item category icon URL",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "old_school_grand_exchange",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/m=itemdb_oldschool/api/catalogue/items.json",
                  "segments" => [
                    {
                      "lit" => "m=itemdb_oldschool",
                    },
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "catalogue",
                    },
                    {
                      "lit" => "items.json",
                    },
                  ],
                  "parts" => [
                    "m=itemdb_oldschool",
                    "api",
                    "catalogue",
                    "items.json",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.items`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "alpha",
                        "orig" => "alpha",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "category",
                        "orig" => "category",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "alpha",
                      "category",
                      "page",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "player_ranking" => {
          "fields" => [
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "The player's username",
            },
            {
              "name" => "rank",
              "title" => "Rank",
              "type" => "`$STRING`",
              "short" => "The player's rank",
            },
            {
              "name" => "score",
              "title" => "Score",
              "type" => "`$STRING`",
              "short" => "The player's score or experience",
            },
          ],
          "name" => "player_ranking",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/m=hiscore/ranking.json",
                  "segments" => [
                    {
                      "lit" => "m=hiscore",
                    },
                    {
                      "lit" => "ranking.json",
                    },
                  ],
                  "parts" => [
                    "m=hiscore",
                    "ranking.json",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "category",
                        "orig" => "category",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "size",
                        "orig" => "size",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "table",
                        "orig" => "table",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "category",
                      "size",
                      "table",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    RunescapeApisFeatures.make_feature(name)
  end
end
