<?php
declare(strict_types=1);

// Typed models for the RunescapeApis SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** GrandExchangeDatabase entity data model. */
class GrandExchangeDatabase
{
    public ?array $average = null;
    public ?array $current = null;
    public ?array $daily = null;
    public ?string $description = null;
    public ?string $icon = null;
    public ?string $icon_large = null;
    public ?int $id = null;
    public ?array $item = null;
    public ?int $last_config_update_runeday = null;
    public ?string $letter = null;
    public ?string $member = null;
    public ?string $name = null;
    public ?array $today = null;
    public ?string $type = null;
    public ?string $type_icon = null;
}

/** Request payload for GrandExchangeDatabase#load. */
class GrandExchangeDatabaseLoadMatch
{
    public int $item_id;
}

/** Match filter for GrandExchangeDatabase#list (any subset of GrandExchangeDatabase fields). */
class GrandExchangeDatabaseListMatch
{
    public ?array $average = null;
    public ?array $current = null;
    public ?array $daily = null;
    public ?string $description = null;
    public ?string $icon = null;
    public ?string $icon_large = null;
    public ?int $id = null;
    public ?array $item = null;
    public ?int $last_config_update_runeday = null;
    public ?string $letter = null;
    public ?string $member = null;
    public ?string $name = null;
    public ?array $today = null;
    public ?string $type = null;
    public ?string $type_icon = null;
}

/** OldSchoolGrandExchange entity data model. */
class OldSchoolGrandExchange
{
    public ?array $current = null;
    public ?string $description = null;
    public ?string $icon = null;
    public ?string $icon_large = null;
    public ?int $id = null;
    public ?string $member = null;
    public ?string $name = null;
    public ?array $today = null;
    public ?string $type = null;
    public ?string $type_icon = null;
}

/** Match filter for OldSchoolGrandExchange#list (any subset of OldSchoolGrandExchange fields). */
class OldSchoolGrandExchangeListMatch
{
    public ?array $current = null;
    public ?string $description = null;
    public ?string $icon = null;
    public ?string $icon_large = null;
    public ?int $id = null;
    public ?string $member = null;
    public ?string $name = null;
    public ?array $today = null;
    public ?string $type = null;
    public ?string $type_icon = null;
}

/** PlayerRanking entity data model. */
class PlayerRanking
{
    public ?string $name = null;
    public ?string $rank = null;
    public ?string $score = null;
}

/** Match filter for PlayerRanking#list (any subset of PlayerRanking fields). */
class PlayerRankingListMatch
{
    public ?string $name = null;
    public ?string $rank = null;
    public ?string $score = null;
}

