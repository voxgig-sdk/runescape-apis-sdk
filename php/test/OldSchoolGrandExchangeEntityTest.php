<?php
declare(strict_types=1);

// OldSchoolGrandExchange entity test

require_once __DIR__ . '/../runescapeapis_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class OldSchoolGrandExchangeEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = RunescapeApisSDK::test(null, null);
        $ent = $testsdk->OldSchoolGrandExchange(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = old_school_grand_exchange_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "old_school_grand_exchange." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set RUNESCAPEAPIS_TEST_OLD_SCHOOL_GRAND_EXCHANGE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $old_school_grand_exchange_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.old_school_grand_exchange")));
        $old_school_grand_exchange_ref01_data = null;
        if (count($old_school_grand_exchange_ref01_data_raw) > 0) {
            $old_school_grand_exchange_ref01_data = Helpers::to_map($old_school_grand_exchange_ref01_data_raw[0][1]);
        }

        // LIST
        $old_school_grand_exchange_ref01_ent = $client->OldSchoolGrandExchange(null);
        $old_school_grand_exchange_ref01_match = [];

        $old_school_grand_exchange_ref01_list_result = $old_school_grand_exchange_ref01_ent->list($old_school_grand_exchange_ref01_match, null);
        $this->assertIsArray($old_school_grand_exchange_ref01_list_result);

    }
}

function old_school_grand_exchange_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/old_school_grand_exchange/OldSchoolGrandExchangeTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = RunescapeApisSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["old_school_grand_exchange01", "old_school_grand_exchange02", "old_school_grand_exchange03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("RUNESCAPEAPIS_TEST_OLD_SCHOOL_GRAND_EXCHANGE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "RUNESCAPEAPIS_TEST_OLD_SCHOOL_GRAND_EXCHANGE_ENTID" => $idmap,
        "RUNESCAPEAPIS_TEST_LIVE" => "FALSE",
        "RUNESCAPEAPIS_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["RUNESCAPEAPIS_TEST_OLD_SCHOOL_GRAND_EXCHANGE_ENTID"]);
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
