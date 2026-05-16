<?php
declare(strict_types=1);

// RunescapeApis SDK utility: prepare_body

class RunescapeApisPrepareBody
{
    public static function call(RunescapeApisContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
