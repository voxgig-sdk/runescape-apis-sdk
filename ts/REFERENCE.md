# RunescapeApis TypeScript SDK Reference

Complete API reference for the RunescapeApis TypeScript SDK.


## RunescapeApisSDK

### Constructor

```ts
new RunescapeApisSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `RunescapeApisSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = RunescapeApisSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `RunescapeApisSDK` instance in test mode.


### Instance Methods

#### `GrandExchangeDatabase(data?: object)`

Create a new `GrandExchangeDatabase` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GrandExchangeDatabaseEntity` instance.

#### `OldSchoolGrandExchange(data?: object)`

Create a new `OldSchoolGrandExchange` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OldSchoolGrandExchangeEntity` instance.

#### `PlayerRanking(data?: object)`

Create a new `PlayerRanking` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PlayerRankingEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `RunescapeApisSDK.test()`.

**Returns:** `RunescapeApisSDK` instance in test mode.


---

## GrandExchangeDatabaseEntity

```ts
const grand_exchange_database = client.GrandExchangeDatabase()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `average` | `Record<string, any>` | No | 30-day moving average with timestamp as key |
| `current` | `Record<string, any>` | No |  |
| `daily` | `Record<string, any>` | No | Daily prices with timestamp as key |
| `day180` | `Record<string, any>` | No |  |
| `day30` | `Record<string, any>` | No |  |
| `day90` | `Record<string, any>` | No |  |
| `description` | `string` | No | The item examine text |
| `icon` | `string` | No | The item sprite image URL |
| `icon_large` | `string` | No | The item detail image URL |
| `id` | `number` | No | The ItemID |
| `items` | `number` | No | The number of items starting with this letter |
| `lastConfigUpdateRuneday` | `number` | No | The runedate when the database was last updated |
| `letter` | `string` | No | The first letter of an item |
| `members` | `string` | No | Whether the item is members-only |
| `name` | `string` | No | The item name |
| `today` | `Record<string, any>` | No |  |
| `type` | `string` | No | The item category |
| `typeIcon` | `string` | No | The item category icon URL |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.GrandExchangeDatabase().list({ category: 1 })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GrandExchangeDatabase().load({ item_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GrandExchangeDatabaseEntity` instance with the same client and
options.

#### `client()`

Return the parent `RunescapeApisSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OldSchoolGrandExchangeEntity

```ts
const old_school_grand_exchange = client.OldSchoolGrandExchange()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `current` | `Record<string, any>` | No |  |
| `description` | `string` | No | The item examine text |
| `icon` | `string` | No | The item sprite image URL |
| `icon_large` | `string` | No | The item detail image URL |
| `id` | `number` | No | The ItemID |
| `members` | `string` | No | Whether the item is members-only |
| `name` | `string` | No | The item name |
| `today` | `Record<string, any>` | No |  |
| `type` | `string` | No | The item category |
| `typeIcon` | `string` | No | The item category icon URL |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.OldSchoolGrandExchange().list({ alpha: "example", category: 1, page: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OldSchoolGrandExchangeEntity` instance with the same client and
options.

#### `client()`

Return the parent `RunescapeApisSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PlayerRankingEntity

```ts
const player_ranking = client.PlayerRanking()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | No | The player's username |
| `rank` | `string` | No | The player's rank |
| `score` | `string` | No | The player's score or experience |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.PlayerRanking().list({ category: 1, size: 1, table: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PlayerRankingEntity` instance with the same client and
options.

#### `client()`

Return the parent `RunescapeApisSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new RunescapeApisSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

