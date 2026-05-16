<?php
declare(strict_types=1);

// RunescapeApis SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class RunescapeApisMakeContext
{
    public static function call(array $ctxmap, ?RunescapeApisContext $basectx): RunescapeApisContext
    {
        return new RunescapeApisContext($ctxmap, $basectx);
    }
}
