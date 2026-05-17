package voxgigrunescapeapissdk

import (
	"github.com/voxgig-sdk/runescape-apis-sdk/go/core"
	"github.com/voxgig-sdk/runescape-apis-sdk/go/entity"
	"github.com/voxgig-sdk/runescape-apis-sdk/go/feature"
	_ "github.com/voxgig-sdk/runescape-apis-sdk/go/utility"
)

// Type aliases preserve external API.
type RunescapeApisSDK = core.RunescapeApisSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type RunescapeApisEntity = core.RunescapeApisEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type RunescapeApisError = core.RunescapeApisError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewGrandExchangeDatabaseEntityFunc = func(client *core.RunescapeApisSDK, entopts map[string]any) core.RunescapeApisEntity {
		return entity.NewGrandExchangeDatabaseEntity(client, entopts)
	}
	core.NewOldSchoolGrandExchangeEntityFunc = func(client *core.RunescapeApisSDK, entopts map[string]any) core.RunescapeApisEntity {
		return entity.NewOldSchoolGrandExchangeEntity(client, entopts)
	}
	core.NewPlayerRankingEntityFunc = func(client *core.RunescapeApisSDK, entopts map[string]any) core.RunescapeApisEntity {
		return entity.NewPlayerRankingEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewRunescapeApisSDK = core.NewRunescapeApisSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
