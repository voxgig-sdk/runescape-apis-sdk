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

func TestOldSchoolGrandExchangeEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.OldSchoolGrandExchange(nil)
		if ent == nil {
			t.Fatal("expected non-nil OldSchoolGrandExchangeEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := old_school_grand_exchangeBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "old_school_grand_exchange." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set RUNESCAPEAPIS_TEST_OLD_SCHOOL_GRAND_EXCHANGE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		oldSchoolGrandExchangeRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.old_school_grand_exchange", setup.data)))
		var oldSchoolGrandExchangeRef01Data map[string]any
		if len(oldSchoolGrandExchangeRef01DataRaw) > 0 {
			oldSchoolGrandExchangeRef01Data = core.ToMapAny(oldSchoolGrandExchangeRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = oldSchoolGrandExchangeRef01Data

		// LIST
		oldSchoolGrandExchangeRef01Ent := client.OldSchoolGrandExchange(nil)
		oldSchoolGrandExchangeRef01Match := map[string]any{}

		oldSchoolGrandExchangeRef01ListResult, err := oldSchoolGrandExchangeRef01Ent.List(oldSchoolGrandExchangeRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, oldSchoolGrandExchangeRef01ListOk := oldSchoolGrandExchangeRef01ListResult.([]any)
		if !oldSchoolGrandExchangeRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", oldSchoolGrandExchangeRef01ListResult)
		}

	})
}

func old_school_grand_exchangeBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "old_school_grand_exchange", "OldSchoolGrandExchangeTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read old_school_grand_exchange test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse old_school_grand_exchange test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"old_school_grand_exchange01", "old_school_grand_exchange02", "old_school_grand_exchange03"},
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
	entidEnvRaw := os.Getenv("RUNESCAPEAPIS_TEST_OLD_SCHOOL_GRAND_EXCHANGE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"RUNESCAPEAPIS_TEST_OLD_SCHOOL_GRAND_EXCHANGE_ENTID": idmap,
		"RUNESCAPEAPIS_TEST_LIVE":      "FALSE",
		"RUNESCAPEAPIS_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["RUNESCAPEAPIS_TEST_OLD_SCHOOL_GRAND_EXCHANGE_ENTID"])
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
