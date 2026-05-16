<?php
declare(strict_types=1);

// RunescapeApis SDK utility: result_body

class RunescapeApisResultBody
{
    public static function call(RunescapeApisContext $ctx): ?RunescapeApisResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
