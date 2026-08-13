# RunescapeApis SDK exists test

import pytest
from runescapeapis_sdk import RunescapeApisSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = RunescapeApisSDK.test(None, None)
        assert testsdk is not None
