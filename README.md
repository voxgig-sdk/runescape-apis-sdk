# RunescapeApis SDK

Query RuneScape's Bestiary, Grand Exchange item database, and player Hiscores

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About RuneScape APIs

[RuneScape](https://www.runescape.com/) is a long-running MMORPG operated by [Jagex](https://www.jagex.com/). The game exposes a small set of public, unauthenticated HTTP endpoints under `secure.runescape.com` that the community uses to read live game data for both RuneScape 3 and Old School RuneScape (OSRS).

What you get from the API:

- **Grand Exchange catalogue and prices** — item metadata, current price, 30/90/180-day trend, and a 180-day price graph, via paths under `m=itemdb_rs/api/` (and `m=itemdb_oldschool/api/` for OSRS).
- **Bestiary** — monster and NPC lookups returning JSON.
- **Hiscores / player rankings** — per-skill leaderboards (`ranking.json`) and per-player stat dumps (`index_lite.ws`), with separate hosts for the main game, Ironman, Hardcore Ironman, and Old School variants.

Operational notes: endpoints are public and require no API key, but they do not send CORS headers, so calls should originate from a server rather than a browser. There is no published rate limit; the [RuneScape Wiki API reference](https://runescape.wiki/w/Application_programming_interface) is the de facto documentation.

## Try it

**TypeScript**
```bash
npm install runescape-apis
```

**Python**
```bash
pip install runescape-apis-sdk
```

**PHP**
```bash
composer require voxgig/runescape-apis-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/runescape-apis-sdk/go
```

**Ruby**
```bash
gem install runescape-apis-sdk
```

**Lua**
```bash
luarocks install runescape-apis-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { RunescapeApisSDK } from 'runescape-apis'

const client = new RunescapeApisSDK({})

// List all grandexchangedatabases
const grandexchangedatabases = await client.GrandExchangeDatabase().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o runescape-apis-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "runescape-apis": {
      "command": "/abs/path/to/runescape-apis-mcp"
    }
  }
}
```

## Entities

The API exposes 3 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **GrandExchangeDatabase** | RuneScape 3 Grand Exchange item catalogue, current prices, and price history, served under `https://secure.runescape.com/m=itemdb_rs/api/` (e.g. `catalogue/detail.json`, `graph/{itemId}.json`). | `/m=itemdb_rs/api/catalogue/items.json` |
| **OldSchoolGrandExchange** | Old School RuneScape equivalent of the Grand Exchange database, served under `https://secure.runescape.com/m=itemdb_oldschool/api/`. | `/m=itemdb_oldschool/api/catalogue/items.json` |
| **PlayerRanking** | Player and skill Hiscores leaderboards, available as JSON via `m=hiscore/ranking.json` and as CSV per-player via `index_lite.ws?player=...`, with parallel hosts for OSRS and Ironman variants. | `/m=hiscore/ranking.json` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from runescapeapis_sdk import RunescapeApisSDK

client = RunescapeApisSDK({})

# List all grandexchangedatabases
grandexchangedatabases, err = client.GrandExchangeDatabase(None).list(None, None)

# Load a specific grandexchangedatabase
grandexchangedatabase, err = client.GrandExchangeDatabase(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'runescapeapis_sdk.php';

$client = new RunescapeApisSDK([]);

// List all grandexchangedatabases
[$grandexchangedatabases, $err] = $client->GrandExchangeDatabase(null)->list(null, null);

// Load a specific grandexchangedatabase
[$grandexchangedatabase, $err] = $client->GrandExchangeDatabase(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/runescape-apis-sdk/go"

client := sdk.NewRunescapeApisSDK(map[string]any{})

// List all grandexchangedatabases
grandexchangedatabases, err := client.GrandExchangeDatabase(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "RunescapeApis_sdk"

client = RunescapeApisSDK.new({})

# List all grandexchangedatabases
grandexchangedatabases, err = client.GrandExchangeDatabase(nil).list(nil, nil)

# Load a specific grandexchangedatabase
grandexchangedatabase, err = client.GrandExchangeDatabase(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("runescape-apis_sdk")

local client = sdk.new({})

-- List all grandexchangedatabases
local grandexchangedatabases, err = client:GrandExchangeDatabase(nil):list(nil, nil)

-- Load a specific grandexchangedatabase
local grandexchangedatabase, err = client:GrandExchangeDatabase(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = RunescapeApisSDK.test()
const result = await client.GrandExchangeDatabase().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = RunescapeApisSDK.test(None, None)
result, err = client.GrandExchangeDatabase(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = RunescapeApisSDK::test(null, null);
[$result, $err] = $client->GrandExchangeDatabase(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.GrandExchangeDatabase(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = RunescapeApisSDK.test(nil, nil)
result, err = client.GrandExchangeDatabase(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:GrandExchangeDatabase(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the RuneScape APIs

- Upstream: [https://www.runescape.com/](https://www.runescape.com/)
- API docs: [https://runescape.wiki/w/Application_programming_interface](https://runescape.wiki/w/Application_programming_interface)

- Endpoints are operated by [Jagex](https://www.jagex.com/) under their game terms of service.
- No published machine-readable licence; treat the data as Jagex's intellectual property.
- Attribution to RuneScape / Jagex is expected when redistributing data.
- Most endpoints do not return CORS headers, so calls must be made from a backend.

---

Generated from the RuneScape APIs OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
