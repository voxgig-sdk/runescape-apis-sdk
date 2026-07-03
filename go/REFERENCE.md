# RunescapeApis Golang SDK Reference

Complete API reference for the RunescapeApis Golang SDK.


## RunescapeApisSDK

### Constructor

```go
func NewRunescapeApisSDK(options map[string]any) *RunescapeApisSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *RunescapeApisSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *RunescapeApisSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `GrandExchangeDatabase(data map[string]any) RunescapeApisEntity`

Create a new `GrandExchangeDatabase` entity instance. Pass `nil` for no initial data.

#### `OldSchoolGrandExchange(data map[string]any) RunescapeApisEntity`

Create a new `OldSchoolGrandExchange` entity instance. Pass `nil` for no initial data.

#### `PlayerRanking(data map[string]any) RunescapeApisEntity`

Create a new `PlayerRanking` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## GrandExchangeDatabaseEntity

```go
grand_exchange_database := client.GrandExchangeDatabase(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `average` | ``$OBJECT`` | No |  |
| `current` | ``$OBJECT`` | No |  |
| `daily` | ``$OBJECT`` | No |  |
| `description` | ``$STRING`` | No |  |
| `icon` | ``$STRING`` | No |  |
| `icon_large` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `item` | ``$OBJECT`` | No |  |
| `last_config_update_runeday` | ``$INTEGER`` | No |  |
| `letter` | ``$STRING`` | No |  |
| `member` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `today` | ``$OBJECT`` | No |  |
| `type` | ``$STRING`` | No |  |
| `type_icon` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.GrandExchangeDatabase(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.GrandExchangeDatabase(nil).Load(map[string]any{"id": "grand_exchange_database_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GrandExchangeDatabaseEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## OldSchoolGrandExchangeEntity

```go
old_school_grand_exchange := client.OldSchoolGrandExchange(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `current` | ``$OBJECT`` | No |  |
| `description` | ``$STRING`` | No |  |
| `icon` | ``$STRING`` | No |  |
| `icon_large` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `member` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `today` | ``$OBJECT`` | No |  |
| `type` | ``$STRING`` | No |  |
| `type_icon` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.OldSchoolGrandExchange(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OldSchoolGrandExchangeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PlayerRankingEntity

```go
player_ranking := client.PlayerRanking(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | ``$STRING`` | No |  |
| `rank` | ``$STRING`` | No |  |
| `score` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.PlayerRanking(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PlayerRankingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewRunescapeApisSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

