// Typed models for the RunescapeApis SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface GrandExchangeDatabase {
  average?: Record<string, any>
  current?: Record<string, any>
  daily?: Record<string, any>
  description?: string
  icon?: string
  icon_large?: string
  id?: number
  item?: Record<string, any>
  last_config_update_runeday?: number
  letter?: string
  member?: string
  name?: string
  today?: Record<string, any>
  type?: string
  type_icon?: string
}

export interface GrandExchangeDatabaseLoadMatch {
  item_id?: number
}

export interface GrandExchangeDatabaseListMatch {
  average?: Record<string, any>
  current?: Record<string, any>
  daily?: Record<string, any>
  description?: string
  icon?: string
  icon_large?: string
  id?: number
  item?: Record<string, any>
  last_config_update_runeday?: number
  letter?: string
  member?: string
  name?: string
  today?: Record<string, any>
  type?: string
  type_icon?: string
}

export interface OldSchoolGrandExchange {
  current?: Record<string, any>
  description?: string
  icon?: string
  icon_large?: string
  id?: number
  member?: string
  name?: string
  today?: Record<string, any>
  type?: string
  type_icon?: string
}

export interface OldSchoolGrandExchangeListMatch {
  current?: Record<string, any>
  description?: string
  icon?: string
  icon_large?: string
  id?: number
  member?: string
  name?: string
  today?: Record<string, any>
  type?: string
  type_icon?: string
}

export interface PlayerRanking {
  name?: string
  rank?: string
  score?: string
}

export interface PlayerRankingListMatch {
  name?: string
  rank?: string
  score?: string
}

