# RunescapeApis SDK utility: feature_add
module RunescapeApisUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
