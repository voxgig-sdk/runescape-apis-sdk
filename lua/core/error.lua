-- RunescapeApis SDK error

local RunescapeApisError = {}
RunescapeApisError.__index = RunescapeApisError


function RunescapeApisError.new(code, msg, ctx)
  local self = setmetatable({}, RunescapeApisError)
  self.is_sdk_error = true
  self.sdk = "RunescapeApis"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function RunescapeApisError:error()
  return self.msg
end


function RunescapeApisError:__tostring()
  return self.msg
end


return RunescapeApisError
