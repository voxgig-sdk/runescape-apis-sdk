<?php
declare(strict_types=1);

// RunescapeApis SDK utility: result_headers

class RunescapeApisResultHeaders
{
    public static function call(RunescapeApisContext $ctx): ?RunescapeApisResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
