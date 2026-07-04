<?php
declare(strict_types=1);

// GrandExchangeDatabase entity test

require_once __DIR__ . '/../runescapeapis_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class GrandExchangeDatabaseEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = RunescapeApisSDK::test(null, null);
        $ent = $testsdk->GrandExchangeDatabase(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = grand_exchange_database_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "grand_exchange_database." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set RUNESCAPEAPIS_TEST_GRAND_EXCHANGE_DATABASE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $grand_exchange_database_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.grand_exchange_database")));
        $grand_exchange_database_ref01_data = null;
        if (count($grand_exchange_database_ref01_data_raw) > 0) {
            $grand_exchange_database_ref01_data = Helpers::to_map($grand_exchange_database_ref01_data_raw[0][1]);
        }

        // LIST
        $grand_exchange_database_ref01_ent = $client->GrandExchangeDatabase(null);
        $grand_exchange_database_ref01_match = [];

        $grand_exchange_database_ref01_list_result = $grand_exchange_database_ref01_ent->list($grand_exchange_database_ref01_match, null);
        $this->assertIsArray($grand_exchange_database_ref01_list_result);

        // LOAD
        $grand_exchange_database_ref01_match_dt0 = [
            "id" => $grand_exchange_database_ref01_data["id"],
        ];
        $grand_exchange_database_ref01_data_dt0_loaded = $grand_exchange_database_ref01_ent->load($grand_exchange_database_ref01_match_dt0, null);
        $grand_exchange_database_ref01_data_dt0_load_result = Helpers::to_map($grand_exchange_database_ref01_data_dt0_loaded);
        $this->assertNotNull($grand_exchange_database_ref01_data_dt0_load_result);
        $this->assertEquals($grand_exchange_database_ref01_data_dt0_load_result["id"], $grand_exchange_database_ref01_data["id"]);

    }
}

function grand_exchange_database_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/grand_exchange_database/GrandExchangeDatabaseTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = RunescapeApisSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["grand_exchange_database01", "grand_exchange_database02", "grand_exchange_database03", "graph01", "graph02", "graph03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("RUNESCAPEAPIS_TEST_GRAND_EXCHANGE_DATABASE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "RUNESCAPEAPIS_TEST_GRAND_EXCHANGE_DATABASE_ENTID" => $idmap,
        "RUNESCAPEAPIS_TEST_LIVE" => "FALSE",
        "RUNESCAPEAPIS_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["RUNESCAPEAPIS_TEST_GRAND_EXCHANGE_DATABASE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["RUNESCAPEAPIS_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new RunescapeApisSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["RUNESCAPEAPIS_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["RUNESCAPEAPIS_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
