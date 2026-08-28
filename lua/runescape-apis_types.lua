-- Typed models for the RunescapeApis SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class GrandExchangeDatabase
---@field average? table
---@field current? table
---@field daily? table
---@field day180? table
---@field day30? table
---@field day90? table
---@field description? string
---@field icon? string
---@field icon_large? string
---@field id? number
---@field items? number
---@field lastConfigUpdateRuneday? number
---@field letter? string
---@field members? string
---@field name? string
---@field today? table
---@field type? string
---@field typeIcon? string

---@class GrandExchangeDatabaseLoadMatch
---@field item_id number

---@class GrandExchangeDatabaseListMatch
---@field alpha? string
---@field category number
---@field page? number

---@class OldSchoolGrandExchange
---@field current? table
---@field description? string
---@field icon? string
---@field icon_large? string
---@field id? number
---@field members? string
---@field name? string
---@field today? table
---@field type? string
---@field typeIcon? string

---@class OldSchoolGrandExchangeListMatch
---@field alpha string
---@field category number
---@field page number

---@class PlayerRanking
---@field name? string
---@field rank? string
---@field score? string

---@class PlayerRankingListMatch
---@field category number
---@field size number
---@field table number

local M = {}

return M
