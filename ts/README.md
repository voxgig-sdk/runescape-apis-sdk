# RunescapeApis TypeScript SDK



The TypeScript SDK for the RunescapeApis API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.GrandExchangeDatabase()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/runescape-apis-sdk/releases](https://github.com/voxgig-sdk/runescape-apis-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { RunescapeApisSDK } from '@voxgig-sdk/runescape-apis'

const client = new RunescapeApisSDK()
```

### 2. List grandexchangedatabase records

`list()` resolves to an array of GrandExchangeDatabase ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const grandexchangedatabases = await client.GrandExchangeDatabase().list()

for (const grandexchangedatabase of grandexchangedatabases) {
  console.log(grandexchangedatabase)
}
```

### 3. Load a grandexchangedatabase

`load()` returns the entity directly and throws on failure:

```ts
try {
  const grandexchangedatabase = await client.GrandExchangeDatabase().load()
  console.log(grandexchangedatabase)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const oldschoolgrandexchanges = await client.OldSchoolGrandExchange().list()
  console.log(oldschoolgrandexchanges)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = RunescapeApisSDK.test()

const oldschoolgrandexchange = await client.OldSchoolGrandExchange().list()
// oldschoolgrandexchange is the entity, populated with mock response data
// — call oldschoolgrandexchange.data() for the record itself
console.log(oldschoolgrandexchange)
```

You can also use the instance method:

```ts
const client = new RunescapeApisSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.OldSchoolGrandExchange()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new RunescapeApisSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
RUNESCAPE_APIS_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### RunescapeApisSDK

#### Constructor

```ts
new RunescapeApisSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `GrandExchangeDatabase(data?)` | `GrandExchangeDatabaseEntity` | Create a GrandExchangeDatabase entity instance. |
| `OldSchoolGrandExchange(data?)` | `OldSchoolGrandExchangeEntity` | Create an OldSchoolGrandExchange entity instance. |
| `PlayerRanking(data?)` | `PlayerRankingEntity` | Create a PlayerRanking entity instance. |
| `tester(testopts?, sdkopts?)` | `RunescapeApisSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `RunescapeApisSDK.test(testopts?, sdkopts?)` | `RunescapeApisSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): RunescapeApisSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### GrandExchangeDatabase

| Field | Description |
| --- | --- |
| `average` |  |
| `current` |  |
| `daily` |  |
| `day180` |  |
| `day30` |  |
| `day90` |  |
| `description` |  |
| `icon` |  |
| `icon_large` |  |
| `id` |  |
| `items` |  |
| `lastConfigUpdateRuneday` |  |
| `letter` |  |
| `members` |  |
| `name` |  |
| `today` |  |
| `type` |  |
| `typeIcon` |  |

Operations: list, load.

API path: `/m=itemdb_rs/api/catalogue/items.json`

#### OldSchoolGrandExchange

| Field | Description |
| --- | --- |
| `current` |  |
| `description` |  |
| `icon` |  |
| `icon_large` |  |
| `id` |  |
| `members` |  |
| `name` |  |
| `today` |  |
| `type` |  |
| `typeIcon` |  |

Operations: list.

API path: `/m=itemdb_oldschool/api/catalogue/items.json`

#### PlayerRanking

| Field | Description |
| --- | --- |
| `name` |  |
| `rank` |  |
| `score` |  |

Operations: list.

API path: `/m=hiscore/ranking.json`



## Entities


### GrandExchangeDatabase

Create an instance: `const grand_exchange_database = client.GrandExchangeDatabase()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `average` | `Record<string, any>` |  |
| `current` | `Record<string, any>` |  |
| `daily` | `Record<string, any>` |  |
| `day180` | `Record<string, any>` |  |
| `day30` | `Record<string, any>` |  |
| `day90` | `Record<string, any>` |  |
| `description` | `string` |  |
| `icon` | `string` |  |
| `icon_large` | `string` |  |
| `id` | `number` |  |
| `items` | `number` |  |
| `lastConfigUpdateRuneday` | `number` |  |
| `letter` | `string` |  |
| `members` | `string` |  |
| `name` | `string` |  |
| `today` | `Record<string, any>` |  |
| `type` | `string` |  |
| `typeIcon` | `string` |  |

#### Example: Load

```ts
const grand_exchange_database = await client.GrandExchangeDatabase().load()
```

#### Example: List

```ts
const grand_exchange_databases = await client.GrandExchangeDatabase().list()
```


### OldSchoolGrandExchange

Create an instance: `const old_school_grand_exchange = client.OldSchoolGrandExchange()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `current` | `Record<string, any>` |  |
| `description` | `string` |  |
| `icon` | `string` |  |
| `icon_large` | `string` |  |
| `id` | `number` |  |
| `members` | `string` |  |
| `name` | `string` |  |
| `today` | `Record<string, any>` |  |
| `type` | `string` |  |
| `typeIcon` | `string` |  |

#### Example: List

```ts
const old_school_grand_exchanges = await client.OldSchoolGrandExchange().list()
```


### PlayerRanking

Create an instance: `const player_ranking = client.PlayerRanking()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` |  |
| `rank` | `string` |  |
| `score` | `string` |  |

#### Example: List

```ts
const player_rankings = await client.PlayerRanking().list()
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
runescape-apis/
├── src/
│   ├── RunescapeApisSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { RunescapeApisSDK } from '@voxgig-sdk/runescape-apis'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const oldschoolgrandexchange = client.OldSchoolGrandExchange()
await oldschoolgrandexchange.list()

// oldschoolgrandexchange.data() now returns the oldschoolgrandexchange data from the last `list`
// oldschoolgrandexchange.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
