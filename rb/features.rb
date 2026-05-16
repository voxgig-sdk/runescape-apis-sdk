# RunescapeApis SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module RunescapeApisFeatures
  def self.make_feature(name)
    case name
    when "base"
      RunescapeApisBaseFeature.new
    when "test"
      RunescapeApisTestFeature.new
    else
      RunescapeApisBaseFeature.new
    end
  end
end
