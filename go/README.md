# RunescapeApis Golang SDK



The Golang SDK for the RunescapeApis API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.GrandExchangeDatabase(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/runescape-apis-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/runescape-apis-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/runescape-apis-sdk/go=../runescape-apis-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/runescape-apis-sdk/go"
)

func main() {
    client := sdk.New()

    // List grandExchangeDatabase records — the value is the array of records itself.
    grandExchangeDatabases, err := client.GrandExchangeDatabase(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range grandExchangeDatabases.([]any) {
        fmt.Println(item)
    }

    // Load a single grandExchangeDatabase — the value is the loaded record.
    grandExchangeDatabase, err := client.GrandExchangeDatabase(nil).Load(map[string]any{"item_id": 1}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(grandExchangeDatabase)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
oldschoolgrandexchanges, err := client.OldSchoolGrandExchange(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = oldschoolgrandexchanges
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

oldSchoolGrandExchange, err := client.OldSchoolGrandExchange(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(oldSchoolGrandExchange) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewRunescapeApisSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
RUNESCAPE_APIS_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewRunescapeApisSDK

```go
func NewRunescapeApisSDK(options map[string]any) *RunescapeApisSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *RunescapeApisSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### RunescapeApisSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `GrandExchangeDatabase` | `(data map[string]any) RunescapeApisEntity` | Create a GrandExchangeDatabase entity instance. |
| `OldSchoolGrandExchange` | `(data map[string]any) RunescapeApisEntity` | Create an OldSchoolGrandExchange entity instance. |
| `PlayerRanking` | `(data map[string]any) RunescapeApisEntity` | Create a PlayerRanking entity instance. |

### Entity interface (RunescapeApisEntity)

All entities implement the `RunescapeApisEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    grandExchangeDatabase, err := client.GrandExchangeDatabase(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // grandExchangeDatabase is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### GrandExchangeDatabase

| Field | Description |
| --- | --- |
| `"average"` | 30-day moving average with timestamp as key |
| `"current"` |  |
| `"daily"` | Daily prices with timestamp as key |
| `"day180"` |  |
| `"day30"` |  |
| `"day90"` |  |
| `"description"` | The item examine text |
| `"icon"` | The item sprite image URL |
| `"icon_large"` | The item detail image URL |
| `"id"` | The ItemID |
| `"items"` | The number of items starting with this letter |
| `"lastConfigUpdateRuneday"` | The runedate when the database was last updated |
| `"letter"` | The first letter of an item |
| `"members"` | Whether the item is members-only |
| `"name"` | The item name |
| `"today"` |  |
| `"type"` | The item category |
| `"typeIcon"` | The item category icon URL |

Operations: List, Load.

API path: `/m=itemdb_rs/api/catalogue/items.json`

#### OldSchoolGrandExchange

| Field | Description |
| --- | --- |
| `"current"` |  |
| `"description"` | The item examine text |
| `"icon"` | The item sprite image URL |
| `"icon_large"` | The item detail image URL |
| `"id"` | The ItemID |
| `"members"` | Whether the item is members-only |
| `"name"` | The item name |
| `"today"` |  |
| `"type"` | The item category |
| `"typeIcon"` | The item category icon URL |

Operations: List.

API path: `/m=itemdb_oldschool/api/catalogue/items.json`

#### PlayerRanking

| Field | Description |
| --- | --- |
| `"name"` | The player's username |
| `"rank"` | The player's rank |
| `"score"` | The player's score or experience |

Operations: List.

API path: `/m=hiscore/ranking.json`



## Entities


### GrandExchangeDatabase

Create an instance: `grandExchangeDatabase := client.GrandExchangeDatabase(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `average` | `map[string]any` | 30-day moving average with timestamp as key |
| `current` | `map[string]any` |  |
| `daily` | `map[string]any` | Daily prices with timestamp as key |
| `day180` | `map[string]any` |  |
| `day30` | `map[string]any` |  |
| `day90` | `map[string]any` |  |
| `description` | `string` | The item examine text |
| `icon` | `string` | The item sprite image URL |
| `icon_large` | `string` | The item detail image URL |
| `id` | `int` | The ItemID |
| `items` | `int` | The number of items starting with this letter |
| `lastConfigUpdateRuneday` | `int` | The runedate when the database was last updated |
| `letter` | `string` | The first letter of an item |
| `members` | `string` | Whether the item is members-only |
| `name` | `string` | The item name |
| `today` | `map[string]any` |  |
| `type` | `string` | The item category |
| `typeIcon` | `string` | The item category icon URL |

#### Example: Load

```go
grandExchangeDatabase, err := client.GrandExchangeDatabase(nil).Load(map[string]any{"item_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(grandExchangeDatabase) // the loaded record
```

#### Example: List

```go
grandExchangeDatabases, err := client.GrandExchangeDatabase(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(grandExchangeDatabases) // the array of records
```


### OldSchoolGrandExchange

Create an instance: `oldSchoolGrandExchange := client.OldSchoolGrandExchange(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `current` | `map[string]any` |  |
| `description` | `string` | The item examine text |
| `icon` | `string` | The item sprite image URL |
| `icon_large` | `string` | The item detail image URL |
| `id` | `int` | The ItemID |
| `members` | `string` | Whether the item is members-only |
| `name` | `string` | The item name |
| `today` | `map[string]any` |  |
| `type` | `string` | The item category |
| `typeIcon` | `string` | The item category icon URL |

#### Example: List

```go
oldSchoolGrandExchanges, err := client.OldSchoolGrandExchange(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(oldSchoolGrandExchanges) // the array of records
```


### PlayerRanking

Create an instance: `playerRanking := client.PlayerRanking(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | The player's username |
| `rank` | `string` | The player's rank |
| `score` | `string` | The player's score or experience |

#### Example: List

```go
playerRankings, err := client.PlayerRanking(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(playerRankings) // the array of records
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/runescape-apis-sdk/go/
├── runescape-apis.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/runescape-apis-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
oldschoolgrandexchange := client.OldSchoolGrandExchange(nil)
oldschoolgrandexchange.List(nil, nil)

// oldschoolgrandexchange.Data() now returns the oldschoolgrandexchange data from the last list
// oldschoolgrandexchange.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
