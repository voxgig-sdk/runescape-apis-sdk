# RunescapeApis Python SDK Reference

Complete API reference for the RunescapeApis Python SDK.


## RunescapeApisSDK

### Constructor

```python
from runescapeapis_sdk import RunescapeApisSDK

client = RunescapeApisSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `RunescapeApisSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = RunescapeApisSDK.test()
```


### Instance Methods

#### `GrandExchangeDatabase(data=None)`

Create a new `GrandExchangeDatabaseEntity` instance. Pass `None` for no initial data.

#### `OldSchoolGrandExchange(data=None)`

Create a new `OldSchoolGrandExchangeEntity` instance. Pass `None` for no initial data.

#### `PlayerRanking(data=None)`

Create a new `PlayerRankingEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## GrandExchangeDatabaseEntity

```python
grand_exchange_database = client.GrandExchangeDatabase()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `average` | `dict` | No | 30-day moving average with timestamp as key |
| `current` | `dict` | No |  |
| `daily` | `dict` | No | Daily prices with timestamp as key |
| `day180` | `dict` | No |  |
| `day30` | `dict` | No |  |
| `day90` | `dict` | No |  |
| `description` | `str` | No | The item examine text |
| `icon` | `str` | No | The item sprite image URL |
| `icon_large` | `str` | No | The item detail image URL |
| `id` | `int` | No | The ItemID |
| `items` | `int` | No | The number of items starting with this letter |
| `lastConfigUpdateRuneday` | `int` | No | The runedate when the database was last updated |
| `letter` | `str` | No | The first letter of an item |
| `members` | `str` | No | Whether the item is members-only |
| `name` | `str` | No | The item name |
| `today` | `dict` | No |  |
| `type` | `str` | No | The item category |
| `typeIcon` | `str` | No | The item category icon URL |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.GrandExchangeDatabase().list()
for grand_exchange_database in results:
    print(grand_exchange_database)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.GrandExchangeDatabase().load({"item_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GrandExchangeDatabaseEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OldSchoolGrandExchangeEntity

```python
old_school_grand_exchange = client.OldSchoolGrandExchange()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `current` | `dict` | No |  |
| `description` | `str` | No | The item examine text |
| `icon` | `str` | No | The item sprite image URL |
| `icon_large` | `str` | No | The item detail image URL |
| `id` | `int` | No | The ItemID |
| `members` | `str` | No | Whether the item is members-only |
| `name` | `str` | No | The item name |
| `today` | `dict` | No |  |
| `type` | `str` | No | The item category |
| `typeIcon` | `str` | No | The item category icon URL |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.OldSchoolGrandExchange().list()
for old_school_grand_exchange in results:
    print(old_school_grand_exchange)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OldSchoolGrandExchangeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PlayerRankingEntity

```python
player_ranking = client.PlayerRanking()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `str` | No | The player's username |
| `rank` | `str` | No | The player's rank |
| `score` | `str` | No | The player's score or experience |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.PlayerRanking().list()
for player_ranking in results:
    print(player_ranking)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlayerRankingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = RunescapeApisSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

