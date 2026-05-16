package = "voxgig-sdk-runescape-apis"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/runescape-apis-sdk.git"
}
description = {
  summary = "RunescapeApis SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["runescape-apis_sdk"] = "runescape-apis_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
