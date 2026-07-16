<?php
declare(strict_types=1);

// RunescapeApis SDK base feature

class RunescapeApisBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(RunescapeApisContext $ctx, array $options): void {}
    public function PostConstruct(RunescapeApisContext $ctx): void {}
    public function PostConstructEntity(RunescapeApisContext $ctx): void {}
    public function SetData(RunescapeApisContext $ctx): void {}
    public function GetData(RunescapeApisContext $ctx): void {}
    public function GetMatch(RunescapeApisContext $ctx): void {}
    public function SetMatch(RunescapeApisContext $ctx): void {}
    public function PrePoint(RunescapeApisContext $ctx): void {}
    public function PreSpec(RunescapeApisContext $ctx): void {}
    public function PreRequest(RunescapeApisContext $ctx): void {}
    public function PreResponse(RunescapeApisContext $ctx): void {}
    public function PreResult(RunescapeApisContext $ctx): void {}
    public function PreDone(RunescapeApisContext $ctx): void {}
    public function PreUnexpected(RunescapeApisContext $ctx): void {}
}
