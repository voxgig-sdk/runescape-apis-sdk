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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "m=itemdb_rs",
									},
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "catalogue",
									},
									map[string]any{
										"lit": "items.json",
									},
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
								"parts": []any{
									"m=itemdb_rs",
									"api",
									"catalogue",
									"items.json",
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
								"segments": []any{
									map[string]any{
										"lit": "m=itemdb_rs",
									},
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "catalogue",
									},
									map[string]any{
										"lit": "category.json",
									},
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
								"parts": []any{
									"m=itemdb_rs",
									"api",
									"catalogue",
									"category.json",
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
								"segments": []any{
									map[string]any{
										"lit": "m=itemdb_rs",
									},
									map[string]any{
										"lit": "obj_big.gif",
									},
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
								"parts": []any{
									"m=itemdb_rs",
									"obj_big.gif",
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
								"segments": []any{
									map[string]any{
										"lit": "m=itemdb_rs",
									},
									map[string]any{
										"lit": "obj_sprite.gif",
									},
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
								"parts": []any{
									"m=itemdb_rs",
									"obj_sprite.gif",
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
								"segments": []any{
									map[string]any{
										"lit": "m=itemdb_rs",
									},
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "catalogue",
									},
									map[string]any{
										"lit": "detail.json",
									},
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
								"parts": []any{
									"m=itemdb_rs",
									"api",
									"catalogue",
									"detail.json",
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
								"segments": []any{
									map[string]any{
										"lit": "m=itemdb_rs",
									},
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "graph",
									},
									map[string]any{
										"lit": "{itemId}.json",
									},
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
								"parts": []any{
									"m=itemdb_rs",
									"api",
									"graph",
									"{itemId}.json",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/m=itemdb_rs/api/info.json",
								"segments": []any{
									map[string]any{
										"lit": "m=itemdb_rs",
									},
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "info.json",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"m=itemdb_rs",
									"api",
									"info.json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "m=itemdb_oldschool",
									},
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "catalogue",
									},
									map[string]any{
										"lit": "items.json",
									},
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
								"parts": []any{
									"m=itemdb_oldschool",
									"api",
									"catalogue",
									"items.json",
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
								"segments": []any{
									map[string]any{
										"lit": "m=hiscore",
									},
									map[string]any{
										"lit": "ranking.json",
									},
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
								"parts": []any{
									"m=hiscore",
									"ranking.json",
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
