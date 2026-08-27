-- RunescapeApis SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "RunescapeApis",
      slug = "runescape-apis",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://secure.runescape.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["grand_exchange_database"] = {},
        ["old_school_grand_exchange"] = {},
        ["player_ranking"] = {},
      },
    },
    entity = {
      ["grand_exchange_database"] = {
        ["fields"] = {
          {
            ["name"] = "average",
            ["short"] = "30-day moving average with timestamp as key",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "current",
            ["type"] = "`$OBJECT`",
            ["union"] = {
              ["branches"] = 2,
              ["count"] = 1,
              ["depth"] = 2,
            },
          },
          {
            ["name"] = "daily",
            ["short"] = "Daily prices with timestamp as key",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "day180",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "day30",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "day90",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "description",
            ["short"] = "The item examine text",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "icon",
            ["short"] = "The item sprite image URL",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "icon_large",
            ["short"] = "The item detail image URL",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "The ItemID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "items",
            ["short"] = "The number of items starting with this letter",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "lastConfigUpdateRuneday",
            ["short"] = "The runedate when the database was last updated",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "letter",
            ["short"] = "The first letter of an item",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "members",
            ["short"] = "Whether the item is members-only",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["short"] = "The item name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "today",
            ["type"] = "`$OBJECT`",
            ["union"] = {
              ["branches"] = 2,
              ["count"] = 1,
              ["depth"] = 2,
            },
          },
          {
            ["name"] = "type",
            ["short"] = "The item category",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "typeIcon",
            ["short"] = "The item category icon URL",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "grand_exchange_database",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "alpha",
                      ["orig"] = "alpha",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "category",
                      ["orig"] = "category",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/m=itemdb_rs/api/catalogue/items.json",
                ["parts"] = {
                  "m=itemdb_rs",
                  "api",
                  "catalogue",
                  "items.json",
                },
                ["select"] = {
                  ["exist"] = {
                    "alpha",
                    "category",
                    "page",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.items`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "category",
                      ["orig"] = "category",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/m=itemdb_rs/api/catalogue/category.json",
                ["parts"] = {
                  "m=itemdb_rs",
                  "api",
                  "catalogue",
                  "category.json",
                },
                ["select"] = {
                  ["exist"] = {
                    "category",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/m=itemdb_rs/obj_big.gif",
                ["parts"] = {
                  "m=itemdb_rs",
                  "obj_big.gif",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/m=itemdb_rs/obj_sprite.gif",
                ["parts"] = {
                  "m=itemdb_rs",
                  "obj_sprite.gif",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "item",
                      ["orig"] = "item",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/m=itemdb_rs/api/catalogue/detail.json",
                ["parts"] = {
                  "m=itemdb_rs",
                  "api",
                  "catalogue",
                  "detail.json",
                },
                ["select"] = {
                  ["exist"] = {
                    "item",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.item`",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "item_id",
                      ["orig"] = "item_id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/m=itemdb_rs/api/graph/{itemId}.json",
                ["parts"] = {
                  "m=itemdb_rs",
                  "api",
                  "graph",
                  "{itemId}.json",
                },
                ["select"] = {
                  ["exist"] = {
                    "item_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/m=itemdb_rs/api/info.json",
                ["parts"] = {
                  "m=itemdb_rs",
                  "api",
                  "info.json",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "graph",
            },
          },
        },
      },
      ["old_school_grand_exchange"] = {
        ["fields"] = {
          {
            ["name"] = "current",
            ["type"] = "`$OBJECT`",
            ["union"] = {
              ["branches"] = 2,
              ["count"] = 1,
              ["depth"] = 2,
            },
          },
          {
            ["name"] = "description",
            ["short"] = "The item examine text",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "icon",
            ["short"] = "The item sprite image URL",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "icon_large",
            ["short"] = "The item detail image URL",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "The ItemID",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "members",
            ["short"] = "Whether the item is members-only",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["short"] = "The item name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "today",
            ["type"] = "`$OBJECT`",
            ["union"] = {
              ["branches"] = 2,
              ["count"] = 1,
              ["depth"] = 2,
            },
          },
          {
            ["name"] = "type",
            ["short"] = "The item category",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "typeIcon",
            ["short"] = "The item category icon URL",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "old_school_grand_exchange",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "alpha",
                      ["orig"] = "alpha",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "category",
                      ["orig"] = "category",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/m=itemdb_oldschool/api/catalogue/items.json",
                ["parts"] = {
                  "m=itemdb_oldschool",
                  "api",
                  "catalogue",
                  "items.json",
                },
                ["select"] = {
                  ["exist"] = {
                    "alpha",
                    "category",
                    "page",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.items`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["player_ranking"] = {
        ["fields"] = {
          {
            ["name"] = "name",
            ["short"] = "The player's username",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "rank",
            ["short"] = "The player's rank",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "score",
            ["short"] = "The player's score or experience",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "player_ranking",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "category",
                      ["orig"] = "category",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "size",
                      ["orig"] = "size",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "table",
                      ["orig"] = "table",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/m=hiscore/ranking.json",
                ["parts"] = {
                  "m=hiscore",
                  "ranking.json",
                },
                ["select"] = {
                  ["exist"] = {
                    "category",
                    "size",
                    "table",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
