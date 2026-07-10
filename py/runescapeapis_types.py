# Typed models for the RunescapeApis SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class GrandExchangeDatabase(TypedDict, total=False):
    average: dict
    current: dict
    daily: dict
    description: str
    icon: str
    icon_large: str
    id: int
    item: dict
    last_config_update_runeday: int
    letter: str
    member: str
    name: str
    today: dict
    type: str
    type_icon: str


class GrandExchangeDatabaseLoadMatch(TypedDict, total=False):
    item_id: int


class GrandExchangeDatabaseListMatch(TypedDict, total=False):
    average: dict
    current: dict
    daily: dict
    description: str
    icon: str
    icon_large: str
    id: int
    item: dict
    last_config_update_runeday: int
    letter: str
    member: str
    name: str
    today: dict
    type: str
    type_icon: str


class OldSchoolGrandExchange(TypedDict, total=False):
    current: dict
    description: str
    icon: str
    icon_large: str
    id: int
    member: str
    name: str
    today: dict
    type: str
    type_icon: str


class OldSchoolGrandExchangeListMatch(TypedDict, total=False):
    current: dict
    description: str
    icon: str
    icon_large: str
    id: int
    member: str
    name: str
    today: dict
    type: str
    type_icon: str


class PlayerRanking(TypedDict, total=False):
    name: str
    rank: str
    score: str


class PlayerRankingListMatch(TypedDict, total=False):
    name: str
    rank: str
    score: str
