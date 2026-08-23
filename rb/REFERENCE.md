# RunescapeApis Ruby SDK Reference

Complete API reference for the RunescapeApis Ruby SDK.


## RunescapeApisSDK

### Constructor

```ruby
require_relative 'RunescapeApis_sdk'

client = RunescapeApisSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `RunescapeApisSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = RunescapeApisSDK.test
```


### Instance Methods

#### `GrandExchangeDatabase(data = nil)`

Create a new `GrandExchangeDatabase` entity instance. Pass `nil` for no initial data.

#### `OldSchoolGrandExchange(data = nil)`

Create a new `OldSchoolGrandExchange` entity instance. Pass `nil` for no initial data.

#### `PlayerRanking(data = nil)`

Create a new `PlayerRanking` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## GrandExchangeDatabaseEntity

```ruby
grand_exchange_database = client.GrandExchangeDatabase
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `average` | `Hash` | No | 30-day moving average with timestamp as key |
| `current` | `Hash` | No |  |
| `daily` | `Hash` | No | Daily prices with timestamp as key |
| `day180` | `Hash` | No |  |
| `day30` | `Hash` | No |  |
| `day90` | `Hash` | No |  |
| `description` | `String` | No | The item examine text |
| `icon` | `String` | No | The item sprite image URL |
| `icon_large` | `String` | No | The item detail image URL |
| `id` | `Integer` | No | The ItemID |
| `items` | `Integer` | No | The number of items starting with this letter |
| `lastConfigUpdateRuneday` | `Integer` | No | The runedate when the database was last updated |
| `letter` | `String` | No | The first letter of an item |
| `members` | `String` | No | Whether the item is members-only |
| `name` | `String` | No | The item name |
| `today` | `Hash` | No |  |
| `type` | `String` | No | The item category |
| `typeIcon` | `String` | No | The item category icon URL |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.GrandExchangeDatabase.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.GrandExchangeDatabase.load({ "item_id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GrandExchangeDatabaseEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OldSchoolGrandExchangeEntity

```ruby
old_school_grand_exchange = client.OldSchoolGrandExchange
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `current` | `Hash` | No |  |
| `description` | `String` | No | The item examine text |
| `icon` | `String` | No | The item sprite image URL |
| `icon_large` | `String` | No | The item detail image URL |
| `id` | `Integer` | No | The ItemID |
| `members` | `String` | No | Whether the item is members-only |
| `name` | `String` | No | The item name |
| `today` | `Hash` | No |  |
| `type` | `String` | No | The item category |
| `typeIcon` | `String` | No | The item category icon URL |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.OldSchoolGrandExchange.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OldSchoolGrandExchangeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PlayerRankingEntity

```ruby
player_ranking = client.PlayerRanking
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `String` | No | The player's username |
| `rank` | `String` | No | The player's rank |
| `score` | `String` | No | The player's score or experience |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.PlayerRanking.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PlayerRankingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = RunescapeApisSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

