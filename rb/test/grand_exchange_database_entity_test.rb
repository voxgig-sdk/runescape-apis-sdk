# GrandExchangeDatabase entity test

require "minitest/autorun"
require "json"
require_relative "../RunescapeApis_sdk"
require_relative "runner"

class GrandExchangeDatabaseEntityTest < Minitest::Test
  def test_create_instance
    testsdk = RunescapeApisSDK.test(nil, nil)
    ent = testsdk.GrandExchangeDatabase(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = grand_exchange_database_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "grand_exchange_database." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set RUNESCAPEAPIS_TEST_GRAND_EXCHANGE_DATABASE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    grand_exchange_database_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.grand_exchange_database")))
    grand_exchange_database_ref01_data = nil
    if grand_exchange_database_ref01_data_raw.length > 0
      grand_exchange_database_ref01_data = Helpers.to_map(grand_exchange_database_ref01_data_raw[0][1])
    end

    # LIST
    grand_exchange_database_ref01_ent = client.GrandExchangeDatabase(nil)
    grand_exchange_database_ref01_match = {}

    grand_exchange_database_ref01_list_result, err = grand_exchange_database_ref01_ent.list(grand_exchange_database_ref01_match, nil)
    assert_nil err
    assert grand_exchange_database_ref01_list_result.is_a?(Array)

    # LOAD
    grand_exchange_database_ref01_match_dt0 = {
      "id" => grand_exchange_database_ref01_data["id"],
    }
    grand_exchange_database_ref01_data_dt0_loaded, err = grand_exchange_database_ref01_ent.load(grand_exchange_database_ref01_match_dt0, nil)
    assert_nil err
    grand_exchange_database_ref01_data_dt0_load_result = Helpers.to_map(grand_exchange_database_ref01_data_dt0_loaded)
    assert !grand_exchange_database_ref01_data_dt0_load_result.nil?
    assert_equal grand_exchange_database_ref01_data_dt0_load_result["id"], grand_exchange_database_ref01_data["id"]

  end
end

def grand_exchange_database_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "grand_exchange_database", "GrandExchangeDatabaseTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = RunescapeApisSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["grand_exchange_database01", "grand_exchange_database02", "grand_exchange_database03", "graph01", "graph02", "graph03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["RUNESCAPEAPIS_TEST_GRAND_EXCHANGE_DATABASE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "RUNESCAPEAPIS_TEST_GRAND_EXCHANGE_DATABASE_ENTID" => idmap,
    "RUNESCAPEAPIS_TEST_LIVE" => "FALSE",
    "RUNESCAPEAPIS_TEST_EXPLAIN" => "FALSE",
    "RUNESCAPEAPIS_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["RUNESCAPEAPIS_TEST_GRAND_EXCHANGE_DATABASE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["RUNESCAPEAPIS_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["RUNESCAPEAPIS_APIKEY"],
      },
      extra || {},
    ])
    client = RunescapeApisSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["RUNESCAPEAPIS_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["RUNESCAPEAPIS_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
