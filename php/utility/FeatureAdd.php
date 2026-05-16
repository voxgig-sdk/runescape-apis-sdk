<?php
declare(strict_types=1);

// RunescapeApis SDK utility: feature_add

class RunescapeApisFeatureAdd
{
    public static function call(RunescapeApisContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
