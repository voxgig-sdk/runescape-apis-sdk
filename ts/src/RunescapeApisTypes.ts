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
  day180?: Record<string, any>
  day30?: Record<string, any>
  day90?: Record<string, any>
  description?: string
  icon?: string
  icon_large?: string
  id?: number
  items?: number
  lastConfigUpdateRuneday?: number
  letter?: string
  members?: string
  name?: string
  today?: Record<string, any>
  type?: string
  typeIcon?: string
}

export interface GrandExchangeDatabaseLoadMatch {
  item_id?: number
}

export interface GrandExchangeDatabaseListMatch {
  average?: Record<string, any>
  current?: Record<string, any>
  daily?: Record<string, any>
  day180?: Record<string, any>
  day30?: Record<string, any>
  day90?: Record<string, any>
  description?: string
  icon?: string
  icon_large?: string
  id?: number
  items?: number
  lastConfigUpdateRuneday?: number
  letter?: string
  members?: string
  name?: string
  today?: Record<string, any>
  type?: string
  typeIcon?: string
}

export interface OldSchoolGrandExchange {
  current?: Record<string, any>
  description?: string
  icon?: string
  icon_large?: string
  id?: number
  members?: string
  name?: string
  today?: Record<string, any>
  type?: string
  typeIcon?: string
}

export interface OldSchoolGrandExchangeListMatch {
  current?: Record<string, any>
  description?: string
  icon?: string
  icon_large?: string
  id?: number
  members?: string
  name?: string
  today?: Record<string, any>
  type?: string
  typeIcon?: string
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

