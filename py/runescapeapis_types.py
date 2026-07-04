# Typed models for the RunescapeApis SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class GrandExchangeDatabase:
    average: Optional[dict] = None
    current: Optional[dict] = None
    daily: Optional[dict] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    icon_large: Optional[str] = None
    id: Optional[int] = None
    item: Optional[dict] = None
    last_config_update_runeday: Optional[int] = None
    letter: Optional[str] = None
    member: Optional[str] = None
    name: Optional[str] = None
    today: Optional[dict] = None
    type: Optional[str] = None
    type_icon: Optional[str] = None


@dataclass
class GrandExchangeDatabaseLoadMatch:
    item_id: int


@dataclass
class GrandExchangeDatabaseListMatch:
    average: Optional[dict] = None
    current: Optional[dict] = None
    daily: Optional[dict] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    icon_large: Optional[str] = None
    id: Optional[int] = None
    item: Optional[dict] = None
    last_config_update_runeday: Optional[int] = None
    letter: Optional[str] = None
    member: Optional[str] = None
    name: Optional[str] = None
    today: Optional[dict] = None
    type: Optional[str] = None
    type_icon: Optional[str] = None


@dataclass
class OldSchoolGrandExchange:
    current: Optional[dict] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    icon_large: Optional[str] = None
    id: Optional[int] = None
    member: Optional[str] = None
    name: Optional[str] = None
    today: Optional[dict] = None
    type: Optional[str] = None
    type_icon: Optional[str] = None


@dataclass
class OldSchoolGrandExchangeListMatch:
    current: Optional[dict] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    icon_large: Optional[str] = None
    id: Optional[int] = None
    member: Optional[str] = None
    name: Optional[str] = None
    today: Optional[dict] = None
    type: Optional[str] = None
    type_icon: Optional[str] = None


@dataclass
class PlayerRanking:
    name: Optional[str] = None
    rank: Optional[str] = None
    score: Optional[str] = None


@dataclass
class PlayerRankingListMatch:
    name: Optional[str] = None
    rank: Optional[str] = None
    score: Optional[str] = None

