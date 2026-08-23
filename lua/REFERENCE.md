# RunescapeApis Lua SDK Reference

Complete API reference for the RunescapeApis Lua SDK.


## RunescapeApisSDK

### Constructor

```lua
local sdk = require("runescape-apis_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `GrandExchangeDatabase(data)`

Create a new `GrandExchangeDatabase` entity instance. Pass `nil` for no initial data.

#### `OldSchoolGrandExchange(data)`

Create a new `OldSchoolGrandExchange` entity instance. Pass `nil` for no initial data.

#### `PlayerRanking(data)`

Create a new `PlayerRanking` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## GrandExchangeDatabaseEntity

```lua
local grand_exchange_database = client:GrandExchangeDatabase(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `average` | `table` | No | 30-day moving average with timestamp as key |
| `current` | `table` | No |  |
| `daily` | `table` | No | Daily prices with timestamp as key |
| `day180` | `table` | No |  |
| `day30` | `table` | No |  |
| `day90` | `table` | No |  |
| `description` | `string` | No | The item examine text |
| `icon` | `string` | No | The item sprite image URL |
| `icon_large` | `string` | No | The item detail image URL |
| `id` | `number` | No | The ItemID |
| `items` | `number` | No | The number of items starting with this letter |
| `lastConfigUpdateRuneday` | `number` | No | The runedate when the database was last updated |
| `letter` | `string` | No | The first letter of an item |
| `members` | `string` | No | Whether the item is members-only |
| `name` | `string` | No | The item name |
| `today` | `table` | No |  |
| `type` | `string` | No | The item category |
| `typeIcon` | `string` | No | The item category icon URL |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:GrandExchangeDatabase():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:GrandExchangeDatabase():load({ item_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GrandExchangeDatabaseEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OldSchoolGrandExchangeEntity

```lua
local old_school_grand_exchange = client:OldSchoolGrandExchange(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `current` | `table` | No |  |
| `description` | `string` | No | The item examine text |
| `icon` | `string` | No | The item sprite image URL |
| `icon_large` | `string` | No | The item detail image URL |
| `id` | `number` | No | The ItemID |
| `members` | `string` | No | Whether the item is members-only |
| `name` | `string` | No | The item name |
| `today` | `table` | No |  |
| `type` | `string` | No | The item category |
| `typeIcon` | `string` | No | The item category icon URL |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:OldSchoolGrandExchange():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OldSchoolGrandExchangeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PlayerRankingEntity

```lua
local player_ranking = client:PlayerRanking(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | No | The player's username |
| `rank` | `string` | No | The player's rank |
| `score` | `string` | No | The player's score or experience |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:PlayerRanking():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlayerRankingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

