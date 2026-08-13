# frozen_string_literal: true

# Typed models for the RunescapeApis SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# GrandExchangeDatabase entity data model.
#
# @!attribute [rw] average
#   @return [Hash, nil]
#
# @!attribute [rw] current
#   @return [Hash, nil]
#
# @!attribute [rw] daily
#   @return [Hash, nil]
#
# @!attribute [rw] day180
#   @return [Hash, nil]
#
# @!attribute [rw] day30
#   @return [Hash, nil]
#
# @!attribute [rw] day90
#   @return [Hash, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] icon
#   @return [String, nil]
#
# @!attribute [rw] icon_large
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] items
#   @return [Integer, nil]
#
# @!attribute [rw] lastConfigUpdateRuneday
#   @return [Integer, nil]
#
# @!attribute [rw] letter
#   @return [String, nil]
#
# @!attribute [rw] members
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] today
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] typeIcon
#   @return [String, nil]
GrandExchangeDatabase = Struct.new(
  :average,
  :current,
  :daily,
  :day180,
  :day30,
  :day90,
  :description,
  :icon,
  :icon_large,
  :id,
  :items,
  :lastConfigUpdateRuneday,
  :letter,
  :members,
  :name,
  :today,
  :type,
  :typeIcon,
  keyword_init: true
)

# Request payload for GrandExchangeDatabase#load.
#
# @!attribute [rw] item_id
#   @return [Integer, nil]
GrandExchangeDatabaseLoadMatch = Struct.new(
  :item_id,
  keyword_init: true
)

# Request payload for GrandExchangeDatabase#list.
#
# @!attribute [rw] average
#   @return [Hash, nil]
#
# @!attribute [rw] current
#   @return [Hash, nil]
#
# @!attribute [rw] daily
#   @return [Hash, nil]
#
# @!attribute [rw] day180
#   @return [Hash, nil]
#
# @!attribute [rw] day30
#   @return [Hash, nil]
#
# @!attribute [rw] day90
#   @return [Hash, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] icon
#   @return [String, nil]
#
# @!attribute [rw] icon_large
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] items
#   @return [Integer, nil]
#
# @!attribute [rw] lastConfigUpdateRuneday
#   @return [Integer, nil]
#
# @!attribute [rw] letter
#   @return [String, nil]
#
# @!attribute [rw] members
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] today
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] typeIcon
#   @return [String, nil]
GrandExchangeDatabaseListMatch = Struct.new(
  :average,
  :current,
  :daily,
  :day180,
  :day30,
  :day90,
  :description,
  :icon,
  :icon_large,
  :id,
  :items,
  :lastConfigUpdateRuneday,
  :letter,
  :members,
  :name,
  :today,
  :type,
  :typeIcon,
  keyword_init: true
)

# OldSchoolGrandExchange entity data model.
#
# @!attribute [rw] current
#   @return [Hash, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] icon
#   @return [String, nil]
#
# @!attribute [rw] icon_large
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] members
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] today
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] typeIcon
#   @return [String, nil]
OldSchoolGrandExchange = Struct.new(
  :current,
  :description,
  :icon,
  :icon_large,
  :id,
  :members,
  :name,
  :today,
  :type,
  :typeIcon,
  keyword_init: true
)

# Request payload for OldSchoolGrandExchange#list.
#
# @!attribute [rw] current
#   @return [Hash, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] icon
#   @return [String, nil]
#
# @!attribute [rw] icon_large
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] members
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] today
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] typeIcon
#   @return [String, nil]
OldSchoolGrandExchangeListMatch = Struct.new(
  :current,
  :description,
  :icon,
  :icon_large,
  :id,
  :members,
  :name,
  :today,
  :type,
  :typeIcon,
  keyword_init: true
)

# PlayerRanking entity data model.
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] rank
#   @return [String, nil]
#
# @!attribute [rw] score
#   @return [String, nil]
PlayerRanking = Struct.new(
  :name,
  :rank,
  :score,
  keyword_init: true
)

# Request payload for PlayerRanking#list.
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] rank
#   @return [String, nil]
#
# @!attribute [rw] score
#   @return [String, nil]
PlayerRankingListMatch = Struct.new(
  :name,
  :rank,
  :score,
  keyword_init: true
)

