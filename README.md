# RunescapeApis SDK

RuneScape APIs client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

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

## Quickstart

### TypeScript

```ts
import { RunescapeApisSDK } from 'runescape-apis'

const client = new RunescapeApisSDK({
  apikey: process.env.RUNESCAPE-APIS_APIKEY,
})

// List all grandexchangedatabases
const grandexchangedatabases = await client.GrandExchangeDatabase().list()
console.log(grandexchangedatabases.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

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
| **GrandExchangeDatabase** |  | `/m=itemdb_rs/api/catalogue/items.json` |
| **OldSchoolGrandExchange** |  | `/m=itemdb_oldschool/api/catalogue/items.json` |
| **PlayerRanking** |  | `/m=hiscore/ranking.json` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from runescapeapis_sdk import RunescapeApisSDK

client = RunescapeApisSDK({
    "apikey": os.environ.get("RUNESCAPE-APIS_APIKEY"),
})

# List all grandexchangedatabases
grandexchangedatabases, err = client.GrandExchangeDatabase().list()
print(grandexchangedatabases)

# Load a specific grandexchangedatabase
grandexchangedatabase, err = client.GrandExchangeDatabase().load({"id": "example_id"})
print(grandexchangedatabase)
```

### PHP

```php
<?php
require_once 'runescapeapis_sdk.php';

$client = new RunescapeApisSDK([
    "apikey" => getenv("RUNESCAPE-APIS_APIKEY"),
]);

// List all grandexchangedatabases
[$grandexchangedatabases, $err] = $client->GrandExchangeDatabase()->list();
print_r($grandexchangedatabases);

// Load a specific grandexchangedatabase
[$grandexchangedatabase, $err] = $client->GrandExchangeDatabase()->load(["id" => "example_id"]);
print_r($grandexchangedatabase);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/runescape-apis-sdk/go"

client := sdk.NewRunescapeApisSDK(map[string]any{
    "apikey": os.Getenv("RUNESCAPE-APIS_APIKEY"),
})

// List all grandexchangedatabases
grandexchangedatabases, err := client.GrandExchangeDatabase(nil).List(nil, nil)
fmt.Println(grandexchangedatabases)
```

### Ruby

```ruby
require_relative "RunescapeApis_sdk"

client = RunescapeApisSDK.new({
  "apikey" => ENV["RUNESCAPE-APIS_APIKEY"],
})

# List all grandexchangedatabases
grandexchangedatabases, err = client.GrandExchangeDatabase().list
puts grandexchangedatabases

# Load a specific grandexchangedatabase
grandexchangedatabase, err = client.GrandExchangeDatabase().load({ "id" => "example_id" })
puts grandexchangedatabase
```

### Lua

```lua
local sdk = require("runescape-apis_sdk")

local client = sdk.new({
  apikey = os.getenv("RUNESCAPE-APIS_APIKEY"),
})

-- List all grandexchangedatabases
local grandexchangedatabases, err = client:GrandExchangeDatabase():list()
print(grandexchangedatabases)

-- Load a specific grandexchangedatabase
local grandexchangedatabase, err = client:GrandExchangeDatabase():load({ id = "example_id" })
print(grandexchangedatabase)
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
client = RunescapeApisSDK.test()
result, err = client.GrandExchangeDatabase().load({"id": "test01"})
```

### PHP

```php
$client = RunescapeApisSDK::test();
[$result, $err] = $client->GrandExchangeDatabase()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.GrandExchangeDatabase(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = RunescapeApisSDK.test
result, err = client.GrandExchangeDatabase().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:GrandExchangeDatabase():load({ id = "test01" })
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

---

Generated from the RuneScape APIs OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
