<?php
declare(strict_types=1);

// RunescapeApis SDK exists test

require_once __DIR__ . '/../runescapeapis_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = RunescapeApisSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
