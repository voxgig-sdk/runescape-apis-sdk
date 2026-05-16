# RunescapeApis Python SDK Reference

Complete API reference for the RunescapeApis Python SDK.


## RunescapeApisSDK

### Constructor

```python
from runescape-apis_sdk import RunescapeApisSDK

client = RunescapeApisSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
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

#### `direct(fetchargs=None) -> tuple`

Make a direct HTTP request to any API endpoint. Returns `(result, err)`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `(result_dict, err)`

#### `prepare(fetchargs=None) -> tuple`

Prepare a fetch definition without sending. Returns `(fetchdef, err)`.


---

## GrandExchangeDatabaseEntity

```python
grand_exchange_database = client.GrandExchangeDatabase()
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.GrandExchangeDatabase().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.GrandExchangeDatabase().load({"id": "grand_exchange_database_id"})
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.OldSchoolGrandExchange().list({})
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
| `name` | ``$STRING`` | No |  |
| `rank` | ``$STRING`` | No |  |
| `score` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.PlayerRanking().list({})
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

