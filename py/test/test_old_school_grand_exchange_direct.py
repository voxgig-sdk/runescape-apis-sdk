# OldSchoolGrandExchange direct test

import json
import pytest

from utility.voxgig_struct import voxgig_struct as vs
from runescapeapis_sdk import RunescapeApisSDK
from core import helpers
from test import runner


class TestOldSchoolGrandExchangeDirect:

    def test_should_direct_list_old_school_grand_exchange(self):
        setup = _old_school_grand_exchange_direct_setup([
            {"id": "direct01"},
            {"id": "direct02"},
        ])
        _skip, _reason = runner.is_control_skipped("direct", "direct-list-old_school_grand_exchange", "live" if setup["live"] else "unit")
        if _skip:
            # pytest already imported at module scope
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        client = setup["client"]


        result, err = client.direct({
            "path": "m=itemdb_oldschool/api/catalogue/items.json",
            "method": "GET",
            "params": {},
        })
        if setup["live"]:
            # Live mode is lenient: synthetic IDs frequently 4xx and the
            # list-response shape varies wildly across public APIs. Skip
            # rather than fail when the call doesn't return a usable list.
            if err is not None:
                pytest.skip(f"list call failed (likely synthetic IDs against live API): {err}")
                return
            if not result.get("ok"):
                pytest.skip("list call not ok (likely synthetic IDs against live API)")
                return
            status = helpers.to_int(result["status"])
            if status < 200 or status >= 300:
                pytest.skip(f"expected 2xx status, got {status}")
                return
        else:
            assert err is None
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert isinstance(result["data"], list)
            assert len(result["data"]) == 2
            assert len(setup["calls"]) == 1



def _old_school_grand_exchange_direct_setup(mockres):
    runner.load_env_local()

    calls = []

    env = runner.env_override({
        "RUNESCAPEAPIS_TEST_OLD_SCHOOL_GRAND_EXCHANGE_ENTID": {},
        "RUNESCAPEAPIS_TEST_LIVE": "FALSE",
        "RUNESCAPEAPIS_APIKEY": "NONE",
    })

    live = env.get("RUNESCAPEAPIS_TEST_LIVE") == "TRUE"

    if live:
        merged_opts = {
            "apikey": env.get("RUNESCAPEAPIS_APIKEY"),
        }
        client = RunescapeApisSDK(merged_opts)
        return {
            "client": client,
            "calls": calls,
            "live": True,
            "idmap": {},
        }

    def mock_fetch(url, init):
        calls.append({"url": url, "init": init})
        return {
            "status": 200,
            "statusText": "OK",
            "headers": {},
            "json": lambda: mockres if mockres is not None else {"id": "direct01"},
            "body": "mock",
        }, None

    client = RunescapeApisSDK({
        "base": "http://localhost:8080",
        "system": {
            "fetch": mock_fetch,
        },
    })

    return {
        "client": client,
        "calls": calls,
        "live": False,
        "idmap": {},
    }
