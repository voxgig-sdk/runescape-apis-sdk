# RunescapeApis SDK exists test

require "minitest/autorun"
require_relative "../RunescapeApis_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = RunescapeApisSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
