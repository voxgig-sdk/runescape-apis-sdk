# RunescapeApis PHP SDK Reference

Complete API reference for the RunescapeApis PHP SDK.


## RunescapeApisSDK

### Constructor

```php
require_once __DIR__ . '/runescape-apis_sdk.php';

$client = new RunescapeApisSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `RunescapeApisSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = RunescapeApisSDK::test();
```


### Instance Methods

#### `GrandExchangeDatabase($data = null)`

Create a new `GrandExchangeDatabaseEntity` instance. Pass `null` for no initial data.

#### `OldSchoolGrandExchange($data = null)`

Create a new `OldSchoolGrandExchangeEntity` instance. Pass `null` for no initial data.

#### `PlayerRanking($data = null)`

Create a new `PlayerRankingEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## GrandExchangeDatabaseEntity

```php
$grand_exchange_database = $client->GrandExchangeDatabase();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->GrandExchangeDatabase()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->GrandExchangeDatabase()->load(["id" => "grand_exchange_database_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GrandExchangeDatabaseEntity`

Create a new `GrandExchangeDatabaseEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## OldSchoolGrandExchangeEntity

```php
$old_school_grand_exchange = $client->OldSchoolGrandExchange();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->OldSchoolGrandExchange()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): OldSchoolGrandExchangeEntity`

Create a new `OldSchoolGrandExchangeEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PlayerRankingEntity

```php
$player_ranking = $client->PlayerRanking();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | ``$STRING`` | No |  |
| `rank` | ``$STRING`` | No |  |
| `score` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->PlayerRanking()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PlayerRankingEntity`

Create a new `PlayerRankingEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new RunescapeApisSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

