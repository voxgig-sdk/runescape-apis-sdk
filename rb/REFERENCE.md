# RunescapeApis Ruby SDK Reference

Complete API reference for the RunescapeApis Ruby SDK.


## RunescapeApisSDK

### Constructor

```ruby
require_relative 'runescape-apis_sdk'

client = RunescapeApisSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
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

#### `direct(fetchargs = {}) -> Hash, err`

Make a direct HTTP request to any API endpoint.

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

**Returns:** `Hash, err`

#### `prepare(fetchargs = {}) -> Hash, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Hash, err`


---

## GrandExchangeDatabaseEntity

```ruby
grand_exchange_database = client.GrandExchangeDatabase
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

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.GrandExchangeDatabase.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result, err`

Load a single entity matching the given criteria.

```ruby
result, err = client.GrandExchangeDatabase.load({ "id" => "grand_exchange_database_id" })
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

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.OldSchoolGrandExchange.list(nil)
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
| `name` | ``$STRING`` | No |  |
| `rank` | ``$STRING`` | No |  |
| `score` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> result, err`

List entities matching the given criteria. Returns an array.

```ruby
results, err = client.PlayerRanking.list(nil)
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

