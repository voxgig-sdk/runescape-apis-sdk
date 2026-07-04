package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/runescape-apis-sdk/go"
	"github.com/voxgig-sdk/runescape-apis-sdk/go/core"

	vs "github.com/voxgig-sdk/runescape-apis-sdk/go/utility/struct"
)

func TestGrandExchangeDatabaseEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GrandExchangeDatabase(nil)
		if ent == nil {
			t.Fatal("expected non-nil GrandExchangeDatabaseEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := grand_exchange_databaseBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "grand_exchange_database." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set RUNESCAPEAPIS_TEST_GRAND_EXCHANGE_DATABASE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		grandExchangeDatabaseRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.grand_exchange_database", setup.data)))
		var grandExchangeDatabaseRef01Data map[string]any
		if len(grandExchangeDatabaseRef01DataRaw) > 0 {
			grandExchangeDatabaseRef01Data = core.ToMapAny(grandExchangeDatabaseRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = grandExchangeDatabaseRef01Data

		// LIST
		grandExchangeDatabaseRef01Ent := client.GrandExchangeDatabase(nil)
		grandExchangeDatabaseRef01Match := map[string]any{}

		grandExchangeDatabaseRef01ListResult, err := grandExchangeDatabaseRef01Ent.List(grandExchangeDatabaseRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, grandExchangeDatabaseRef01ListOk := grandExchangeDatabaseRef01ListResult.([]any)
		if !grandExchangeDatabaseRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", grandExchangeDatabaseRef01ListResult)
		}

		// LOAD
		grandExchangeDatabaseRef01MatchDt0 := map[string]any{
			"id": grandExchangeDatabaseRef01Data["id"],
		}
		grandExchangeDatabaseRef01DataDt0Loaded, err := grandExchangeDatabaseRef01Ent.Load(grandExchangeDatabaseRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		grandExchangeDatabaseRef01DataDt0LoadResult := core.ToMapAny(grandExchangeDatabaseRef01DataDt0Loaded)
		if grandExchangeDatabaseRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if grandExchangeDatabaseRef01DataDt0LoadResult["id"] != grandExchangeDatabaseRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func grand_exchange_databaseBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "grand_exchange_database", "GrandExchangeDatabaseTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read grand_exchange_database test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse grand_exchange_database test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"grand_exchange_database01", "grand_exchange_database02", "grand_exchange_database03", "graph01", "graph02", "graph03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("RUNESCAPEAPIS_TEST_GRAND_EXCHANGE_DATABASE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"RUNESCAPEAPIS_TEST_GRAND_EXCHANGE_DATABASE_ENTID": idmap,
		"RUNESCAPEAPIS_TEST_LIVE":      "FALSE",
		"RUNESCAPEAPIS_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["RUNESCAPEAPIS_TEST_GRAND_EXCHANGE_DATABASE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["RUNESCAPEAPIS_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewRunescapeApisSDK(core.ToMapAny(mergedOpts))
	}

	live := env["RUNESCAPEAPIS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["RUNESCAPEAPIS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
