# RunescapeApis SDK feature factory

from runescapeapis_sdk.feature.base_feature import RunescapeApisBaseFeature
from runescapeapis_sdk.feature.test_feature import RunescapeApisTestFeature


def _make_feature(name):
    features = {
        "base": lambda: RunescapeApisBaseFeature(),
        "test": lambda: RunescapeApisTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
