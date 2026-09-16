# RunescapeApis SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module RunescapeApisFeatures
  def self.make_feature(name)
    case name
    when "base"
      RunescapeApisBaseFeature.new
    when "ratelimit"
      RunescapeApisRatelimitFeature.new
    when "retry"
      RunescapeApisRetryFeature.new
    when "test"
      RunescapeApisTestFeature.new
    when "timeout"
      RunescapeApisTimeoutFeature.new
    else
      RunescapeApisBaseFeature.new
    end
  end
end
