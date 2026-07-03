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

func TestPlayerRankingEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PlayerRanking(nil)
		if ent == nil {
			t.Fatal("expected non-nil PlayerRankingEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := player_rankingBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "player_ranking." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set RUNESCAPEAPIS_TEST_PLAYER_RANKING_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		playerRankingRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.player_ranking", setup.data)))
		var playerRankingRef01Data map[string]any
		if len(playerRankingRef01DataRaw) > 0 {
			playerRankingRef01Data = core.ToMapAny(playerRankingRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = playerRankingRef01Data

		// LIST
		playerRankingRef01Ent := client.PlayerRanking(nil)
		playerRankingRef01Match := map[string]any{}

		playerRankingRef01ListResult, err := playerRankingRef01Ent.List(playerRankingRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, playerRankingRef01ListOk := playerRankingRef01ListResult.([]any)
		if !playerRankingRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", playerRankingRef01ListResult)
		}

	})
}

func player_rankingBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "player_ranking", "PlayerRankingTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read player_ranking test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse player_ranking test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"player_ranking01", "player_ranking02", "player_ranking03"},
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
	entidEnvRaw := os.Getenv("RUNESCAPEAPIS_TEST_PLAYER_RANKING_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"RUNESCAPEAPIS_TEST_PLAYER_RANKING_ENTID": idmap,
		"RUNESCAPEAPIS_TEST_LIVE":      "FALSE",
		"RUNESCAPEAPIS_TEST_EXPLAIN":   "FALSE",
		"RUNESCAPEAPIS_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["RUNESCAPEAPIS_TEST_PLAYER_RANKING_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["RUNESCAPEAPIS_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["RUNESCAPEAPIS_APIKEY"],
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
