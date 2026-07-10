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
---@field description? string
---@field icon? string
---@field icon_large? string
---@field id? number
---@field item? table
---@field last_config_update_runeday? number
---@field letter? string
---@field member? string
---@field name? string
---@field today? table
---@field type? string
---@field type_icon? string

---@class GrandExchangeDatabaseLoadMatch
---@field item_id? number

---@class GrandExchangeDatabaseListMatch
---@field average? table
---@field current? table
---@field daily? table
---@field description? string
---@field icon? string
---@field icon_large? string
---@field id? number
---@field item? table
---@field last_config_update_runeday? number
---@field letter? string
---@field member? string
---@field name? string
---@field today? table
---@field type? string
---@field type_icon? string

---@class OldSchoolGrandExchange
---@field current? table
---@field description? string
---@field icon? string
---@field icon_large? string
---@field id? number
---@field member? string
---@field name? string
---@field today? table
---@field type? string
---@field type_icon? string

---@class OldSchoolGrandExchangeListMatch
---@field current? table
---@field description? string
---@field icon? string
---@field icon_large? string
---@field id? number
---@field member? string
---@field name? string
---@field today? table
---@field type? string
---@field type_icon? string

---@class PlayerRanking
---@field name? string
---@field rank? string
---@field score? string

---@class PlayerRankingListMatch
---@field name? string
---@field rank? string
---@field score? string

local M = {}

return M
