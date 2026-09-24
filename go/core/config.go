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
						"title": "Average",
						"type": "`$OBJECT`",
						"short": "30-day moving average with timestamp as key",
					},
					map[string]any{
						"name": "current",
						"title": "Current",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "daily",
						"title": "Daily",
						"type": "`$OBJECT`",
						"short": "Daily prices with timestamp as key",
					},
					map[string]any{
						"name": "day180",
						"title": "Day180",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "day30",
						"title": "Day30",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "day90",
						"title": "Day90",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "The item examine text",
					},
					map[string]any{
						"name": "icon",
						"title": "Icon",
						"type": "`$STRING`",
						"short": "The item sprite image URL",
					},
					map[string]any{
						"name": "icon_large",
						"title": "Icon Large",
						"type": "`$STRING`",
						"short": "The item detail image URL",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "The ItemID",
					},
					map[string]any{
						"name": "items",
						"title": "Items",
						"type": "`$INTEGER`",
						"short": "The number of items starting with this letter",
					},
					map[string]any{
						"name": "lastConfigUpdateRuneday",
						"title": "Last Config Update Runeday",
						"type": "`$INTEGER`",
						"short": "The runedate when the database was last updated",
					},
					map[string]any{
						"name": "letter",
						"title": "Letter",
						"type": "`$STRING`",
						"short": "The first letter of an item",
					},
					map[string]any{
						"name": "members",
						"title": "Members",
						"type": "`$STRING`",
						"short": "Whether the item is members-only",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The item name",
					},
					map[string]any{
						"name": "today",
						"title": "Today",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "The item category",
					},
					map[string]any{
						"name": "typeIcon",
						"title": "Type Icon",
						"type": "`$STRING`",
						"short": "The item category icon URL",
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
								"parts": []any{
									"m=itemdb_rs",
									"api",
									"catalogue",
									"items.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "alpha",
											"orig": "alpha",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "category",
											"orig": "category",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"alpha",
										"category",
										"page",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"m=itemdb_rs",
									"api",
									"catalogue",
									"category.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "category",
											"orig": "category",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"category",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"m=itemdb_rs",
									"obj_big.gif",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"m=itemdb_rs",
									"obj_sprite.gif",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"m=itemdb_rs",
									"api",
									"catalogue",
									"detail.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.item`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "item",
											"orig": "item",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"item",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"m=itemdb_rs",
									"api",
									"graph",
									"{itemId}.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "item_id",
											"orig": "item_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"item_id",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"m=itemdb_rs",
									"api",
									"info.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Current",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "The item examine text",
					},
					map[string]any{
						"name": "icon",
						"title": "Icon",
						"type": "`$STRING`",
						"short": "The item sprite image URL",
					},
					map[string]any{
						"name": "icon_large",
						"title": "Icon Large",
						"type": "`$STRING`",
						"short": "The item detail image URL",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "The ItemID",
					},
					map[string]any{
						"name": "members",
						"title": "Members",
						"type": "`$STRING`",
						"short": "Whether the item is members-only",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "The item name",
					},
					map[string]any{
						"name": "today",
						"title": "Today",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "The item category",
					},
					map[string]any{
						"name": "typeIcon",
						"title": "Type Icon",
						"type": "`$STRING`",
						"short": "The item category icon URL",
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
								"parts": []any{
									"m=itemdb_oldschool",
									"api",
									"catalogue",
									"items.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "alpha",
											"orig": "alpha",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "category",
											"orig": "category",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"alpha",
										"category",
										"page",
									},
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
						"title": "Name",
						"type": "`$STRING`",
						"short": "The player's username",
					},
					map[string]any{
						"name": "rank",
						"title": "Rank",
						"type": "`$STRING`",
						"short": "The player's rank",
					},
					map[string]any{
						"name": "score",
						"title": "Score",
						"type": "`$STRING`",
						"short": "The player's score or experience",
					},
				},
				"name": "player_ranking",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"m=hiscore",
									"ranking.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "category",
											"orig": "category",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "size",
											"orig": "size",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "table",
											"orig": "table",
											"type": "`$INTEGER`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"category",
										"size",
										"table",
									},
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
