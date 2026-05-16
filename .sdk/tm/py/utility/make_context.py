# RunescapeApis SDK utility: make_context

from core.context import RunescapeApisContext


def make_context_util(ctxmap, basectx):
    return RunescapeApisContext(ctxmap, basectx)
