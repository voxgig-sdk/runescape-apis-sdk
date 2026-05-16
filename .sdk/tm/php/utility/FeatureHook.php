<?php
declare(strict_types=1);

// RunescapeApis SDK utility: feature_hook

class RunescapeApisFeatureHook
{
    public static function call(RunescapeApisContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
