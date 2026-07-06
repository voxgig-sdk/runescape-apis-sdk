// Typed models for the RunescapeApis SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// GrandExchangeDatabase is the typed data model for the grand_exchange_database entity.
type GrandExchangeDatabase struct {
	Average *map[string]any `json:"average,omitempty"`
	Current *map[string]any `json:"current,omitempty"`
	Daily *map[string]any `json:"daily,omitempty"`
	Description *string `json:"description,omitempty"`
	Icon *string `json:"icon,omitempty"`
	IconLarge *string `json:"icon_large,omitempty"`
	Id *int `json:"id,omitempty"`
	Item *map[string]any `json:"item,omitempty"`
	LastConfigUpdateRuneday *int `json:"last_config_update_runeday,omitempty"`
	Letter *string `json:"letter,omitempty"`
	Member *string `json:"member,omitempty"`
	Name *string `json:"name,omitempty"`
	Today *map[string]any `json:"today,omitempty"`
	Type *string `json:"type,omitempty"`
	TypeIcon *string `json:"type_icon,omitempty"`
}

// GrandExchangeDatabaseLoadMatch is the typed request payload for GrandExchangeDatabase.LoadTyped.
type GrandExchangeDatabaseLoadMatch struct {
	ItemId int `json:"item_id"`
}

// GrandExchangeDatabaseListMatch is the typed request payload for GrandExchangeDatabase.ListTyped.
type GrandExchangeDatabaseListMatch struct {
	Average *map[string]any `json:"average,omitempty"`
	Current *map[string]any `json:"current,omitempty"`
	Daily *map[string]any `json:"daily,omitempty"`
	Description *string `json:"description,omitempty"`
	Icon *string `json:"icon,omitempty"`
	IconLarge *string `json:"icon_large,omitempty"`
	Id *int `json:"id,omitempty"`
	Item *map[string]any `json:"item,omitempty"`
	LastConfigUpdateRuneday *int `json:"last_config_update_runeday,omitempty"`
	Letter *string `json:"letter,omitempty"`
	Member *string `json:"member,omitempty"`
	Name *string `json:"name,omitempty"`
	Today *map[string]any `json:"today,omitempty"`
	Type *string `json:"type,omitempty"`
	TypeIcon *string `json:"type_icon,omitempty"`
}

// OldSchoolGrandExchange is the typed data model for the old_school_grand_exchange entity.
type OldSchoolGrandExchange struct {
	Current *map[string]any `json:"current,omitempty"`
	Description *string `json:"description,omitempty"`
	Icon *string `json:"icon,omitempty"`
	IconLarge *string `json:"icon_large,omitempty"`
	Id *int `json:"id,omitempty"`
	Member *string `json:"member,omitempty"`
	Name *string `json:"name,omitempty"`
	Today *map[string]any `json:"today,omitempty"`
	Type *string `json:"type,omitempty"`
	TypeIcon *string `json:"type_icon,omitempty"`
}

// OldSchoolGrandExchangeListMatch is the typed request payload for OldSchoolGrandExchange.ListTyped.
type OldSchoolGrandExchangeListMatch struct {
	Current *map[string]any `json:"current,omitempty"`
	Description *string `json:"description,omitempty"`
	Icon *string `json:"icon,omitempty"`
	IconLarge *string `json:"icon_large,omitempty"`
	Id *int `json:"id,omitempty"`
	Member *string `json:"member,omitempty"`
	Name *string `json:"name,omitempty"`
	Today *map[string]any `json:"today,omitempty"`
	Type *string `json:"type,omitempty"`
	TypeIcon *string `json:"type_icon,omitempty"`
}

// PlayerRanking is the typed data model for the player_ranking entity.
type PlayerRanking struct {
	Name *string `json:"name,omitempty"`
	Rank *string `json:"rank,omitempty"`
	Score *string `json:"score,omitempty"`
}

// PlayerRankingListMatch is the typed request payload for PlayerRanking.ListTyped.
type PlayerRankingListMatch struct {
	Name *string `json:"name,omitempty"`
	Rank *string `json:"rank,omitempty"`
	Score *string `json:"score,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
