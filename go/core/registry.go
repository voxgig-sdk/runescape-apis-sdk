package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewGrandExchangeDatabaseEntityFunc func(client *RunescapeApisSDK, entopts map[string]any) RunescapeApisEntity

var NewOldSchoolGrandExchangeEntityFunc func(client *RunescapeApisSDK, entopts map[string]any) RunescapeApisEntity

var NewPlayerRankingEntityFunc func(client *RunescapeApisSDK, entopts map[string]any) RunescapeApisEntity

