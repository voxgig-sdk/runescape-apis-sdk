<?php
declare(strict_types=1);

// RunescapeApis SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class RunescapeApisFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new RunescapeApisBaseFeature();
            case "test":
                return new RunescapeApisTestFeature();
            default:
                return new RunescapeApisBaseFeature();
        }
    }
}
