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
    public ?array $day180 = null;
    public ?array $day30 = null;
    public ?array $day90 = null;
    public ?string $description = null;
    public ?string $icon = null;
    public ?string $icon_large = null;
    public ?int $id = null;
    public ?int $items = null;
    public ?int $lastConfigUpdateRuneday = null;
    public ?string $letter = null;
    public ?string $members = null;
    public ?string $name = null;
    public ?array $today = null;
    public ?string $type = null;
    public ?string $typeIcon = null;
}

/** Request payload for GrandExchangeDatabase#load. */
class GrandExchangeDatabaseLoadMatch
{
    public int $item_id;
}

/** Request payload for GrandExchangeDatabase#list. */
class GrandExchangeDatabaseListMatch
{
    public ?array $average = null;
    public ?array $current = null;
    public ?array $daily = null;
    public ?array $day180 = null;
    public ?array $day30 = null;
    public ?array $day90 = null;
    public ?string $description = null;
    public ?string $icon = null;
    public ?string $icon_large = null;
    public ?int $id = null;
    public ?int $items = null;
    public ?int $lastConfigUpdateRuneday = null;
    public ?string $letter = null;
    public ?string $members = null;
    public ?string $name = null;
    public ?array $today = null;
    public ?string $type = null;
    public ?string $typeIcon = null;
}

/** OldSchoolGrandExchange entity data model. */
class OldSchoolGrandExchange
{
    public ?array $current = null;
    public ?string $description = null;
    public ?string $icon = null;
    public ?string $icon_large = null;
    public ?int $id = null;
    public ?string $members = null;
    public ?string $name = null;
    public ?array $today = null;
    public ?string $type = null;
    public ?string $typeIcon = null;
}

/** Request payload for OldSchoolGrandExchange#list. */
class OldSchoolGrandExchangeListMatch
{
    public ?array $current = null;
    public ?string $description = null;
    public ?string $icon = null;
    public ?string $icon_large = null;
    public ?int $id = null;
    public ?string $members = null;
    public ?string $name = null;
    public ?array $today = null;
    public ?string $type = null;
    public ?string $typeIcon = null;
}

/** PlayerRanking entity data model. */
class PlayerRanking
{
    public ?string $name = null;
    public ?string $rank = null;
    public ?string $score = null;
}

/** Request payload for PlayerRanking#list. */
class PlayerRankingListMatch
{
    public ?string $name = null;
    public ?string $rank = null;
    public ?string $score = null;
}

