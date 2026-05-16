# RunescapeApis SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

RunescapeApisUtility.registrar = ->(u) {
  u.clean = RunescapeApisUtilities::Clean
  u.done = RunescapeApisUtilities::Done
  u.make_error = RunescapeApisUtilities::MakeError
  u.feature_add = RunescapeApisUtilities::FeatureAdd
  u.feature_hook = RunescapeApisUtilities::FeatureHook
  u.feature_init = RunescapeApisUtilities::FeatureInit
  u.fetcher = RunescapeApisUtilities::Fetcher
  u.make_fetch_def = RunescapeApisUtilities::MakeFetchDef
  u.make_context = RunescapeApisUtilities::MakeContext
  u.make_options = RunescapeApisUtilities::MakeOptions
  u.make_request = RunescapeApisUtilities::MakeRequest
  u.make_response = RunescapeApisUtilities::MakeResponse
  u.make_result = RunescapeApisUtilities::MakeResult
  u.make_point = RunescapeApisUtilities::MakePoint
  u.make_spec = RunescapeApisUtilities::MakeSpec
  u.make_url = RunescapeApisUtilities::MakeUrl
  u.param = RunescapeApisUtilities::Param
  u.prepare_auth = RunescapeApisUtilities::PrepareAuth
  u.prepare_body = RunescapeApisUtilities::PrepareBody
  u.prepare_headers = RunescapeApisUtilities::PrepareHeaders
  u.prepare_method = RunescapeApisUtilities::PrepareMethod
  u.prepare_params = RunescapeApisUtilities::PrepareParams
  u.prepare_path = RunescapeApisUtilities::PreparePath
  u.prepare_query = RunescapeApisUtilities::PrepareQuery
  u.result_basic = RunescapeApisUtilities::ResultBasic
  u.result_body = RunescapeApisUtilities::ResultBody
  u.result_headers = RunescapeApisUtilities::ResultHeaders
  u.transform_request = RunescapeApisUtilities::TransformRequest
  u.transform_response = RunescapeApisUtilities::TransformResponse
}
