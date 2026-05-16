# RunescapeApis SDK utility: make_context
require_relative '../core/context'
module RunescapeApisUtilities
  MakeContext = ->(ctxmap, basectx) {
    RunescapeApisContext.new(ctxmap, basectx)
  }
end
