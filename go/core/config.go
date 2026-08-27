package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "RunescapeApis",
			"slug": "runescape-apis",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://secure.runescape.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"grand_exchange_database": map[string]any{},
				"old_school_grand_exchange": map[string]any{},
				"player_ranking": map[string]any{},
			},
		},
		"entity": map[string]any{
			"grand_exchange_database": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "average",
						"short": "30-day moving average with timestamp as key",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "current",
						"type": "`$OBJECT`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 2,
						},
					},
					map[string]any{
						"name": "daily",
						"short": "Daily prices with timestamp as key",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "day180",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "day30",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "day90",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "description",
						"short": "The item examine text",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "icon",
						"short": "The item sprite image URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "icon_large",
						"short": "The item detail image URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "The ItemID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "items",
						"short": "The number of items starting with this letter",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "lastConfigUpdateRuneday",
						"short": "The runedate when the database was last updated",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "letter",
						"short": "The first letter of an item",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "members",
						"short": "Whether the item is members-only",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "The item name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "today",
						"type": "`$OBJECT`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 2,
						},
					},
					map[string]any{
						"name": "type",
						"short": "The item category",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "typeIcon",
						"short": "The item category icon URL",
						"type": "`$STRING`",
					},
				},
				"name": "grand_exchange_database",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alpha",
											"orig": "alpha",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "category",
											"orig": "category",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "page",
											"orig": "page",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/m=itemdb_rs/api/catalogue/items.json",
								"parts": []any{
									"m=itemdb_rs",
									"api",
									"catalogue",
									"items.json",
								},
								"select": map[string]any{
									"exist": []any{
										"alpha",
										"category",
										"page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "category",
											"orig": "category",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/m=itemdb_rs/api/catalogue/category.json",
								"parts": []any{
									"m=itemdb_rs",
									"api",
									"catalogue",
									"category.json",
								},
								"select": map[string]any{
									"exist": []any{
										"category",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/m=itemdb_rs/obj_big.gif",
								"parts": []any{
									"m=itemdb_rs",
									"obj_big.gif",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/m=itemdb_rs/obj_sprite.gif",
								"parts": []any{
									"m=itemdb_rs",
									"obj_sprite.gif",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "item",
											"orig": "item",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/m=itemdb_rs/api/catalogue/detail.json",
								"parts": []any{
									"m=itemdb_rs",
									"api",
									"catalogue",
									"detail.json",
								},
								"select": map[string]any{
									"exist": []any{
										"item",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.item`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "item_id",
											"orig": "item_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/m=itemdb_rs/api/graph/{itemId}.json",
								"parts": []any{
									"m=itemdb_rs",
									"api",
									"graph",
									"{itemId}.json",
								},
								"select": map[string]any{
									"exist": []any{
										"item_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/m=itemdb_rs/api/info.json",
								"parts": []any{
									"m=itemdb_rs",
									"api",
									"info.json",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"graph",
						},
					},
				},
			},
			"old_school_grand_exchange": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "current",
						"type": "`$OBJECT`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 2,
						},
					},
					map[string]any{
						"name": "description",
						"short": "The item examine text",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "icon",
						"short": "The item sprite image URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "icon_large",
						"short": "The item detail image URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "The ItemID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "members",
						"short": "Whether the item is members-only",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "The item name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "today",
						"type": "`$OBJECT`",
						"union": map[string]any{
							"branches": 2,
							"count": 1,
							"depth": 2,
						},
					},
					map[string]any{
						"name": "type",
						"short": "The item category",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "typeIcon",
						"short": "The item category icon URL",
						"type": "`$STRING`",
					},
				},
				"name": "old_school_grand_exchange",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "alpha",
											"orig": "alpha",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "category",
											"orig": "category",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "page",
											"orig": "page",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/m=itemdb_oldschool/api/catalogue/items.json",
								"parts": []any{
									"m=itemdb_oldschool",
									"api",
									"catalogue",
									"items.json",
								},
								"select": map[string]any{
									"exist": []any{
										"alpha",
										"category",
										"page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"player_ranking": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "name",
						"short": "The player's username",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rank",
						"short": "The player's rank",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "score",
						"short": "The player's score or experience",
						"type": "`$STRING`",
					},
				},
				"name": "player_ranking",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "category",
											"orig": "category",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "size",
											"orig": "size",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "table",
											"orig": "table",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/m=hiscore/ranking.json",
								"parts": []any{
									"m=hiscore",
									"ranking.json",
								},
								"select": map[string]any{
									"exist": []any{
										"category",
										"size",
										"table",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
