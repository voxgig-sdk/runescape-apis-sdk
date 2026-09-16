

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { RunescapeApisSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('OldSchoolGrandExchangeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RUNESCAPE_APIS_TEST_LIVE=TRUE.
  afterEach(liveDelay('RUNESCAPE_APIS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RunescapeApisSDK.test()
    const ent = testsdk.OldSchoolGrandExchange()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RUNESCAPE_APIS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'old_school_grand_exchange.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"current","req":false,"type":"`$OBJECT`","union":{"branches":2,"count":1,"depth":2},"index$":0},{"active":true,"name":"description","req":false,"short":"The item examine text","type":"`$STRING`","index$":1},{"active":true,"name":"icon","req":false,"short":"The item sprite image URL","type":"`$STRING`","index$":2},{"active":true,"name":"icon_large","req":false,"short":"The item detail image URL","type":"`$STRING`","index$":3},{"active":true,"name":"id","req":false,"short":"The ItemID","type":"`$INTEGER`","index$":4},{"active":true,"name":"members","req":false,"short":"Whether the item is members-only","type":"`$STRING`","index$":5},{"active":true,"name":"name","req":false,"short":"The item name","type":"`$STRING`","index$":6},{"active":true,"name":"today","req":false,"type":"`$OBJECT`","union":{"branches":2,"count":1,"depth":2},"index$":7},{"active":true,"name":"type","req":false,"short":"The item category","type":"`$STRING`","index$":8},{"active":true,"name":"typeIcon","req":false,"short":"The item category icon URL","type":"`$STRING`","index$":9}],"id":{"field":"id","name":"id"},"name":"old_school_grand_exchange","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"alpha","orig":"alpha","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"category","orig":"category","reqd":true,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"page","orig":"page","reqd":true,"type":"`$INTEGER`","index$":2}]},"contract":{"id":"GET /m=itemdb_oldschool/api/catalogue/items.json","json":"{\"operationId\":\"getOSRSItemsByCategory\",\"parameters\":[{\"description\":\"The category identification number (only 1 category available for OSRS)\",\"in\":\"query\",\"name\":\"category\",\"required\":true,\"schema\":{\"enum\":[1],\"type\":\"integer\"}},{\"description\":\"The starting letter for the items (lowercase)\",\"in\":\"query\",\"name\":\"alpha\",\"required\":true,\"schema\":{\"pattern\":\"^[a-z]$\",\"type\":\"string\"}},{\"description\":\"The page number beginning at 1\",\"in\":\"query\",\"name\":\"page\",\"required\":true,\"schema\":{\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"items\":{\"items\":{\"properties\":{\"current\":{\"properties\":{\"price\":{\"description\":\"The item trade price (can be integer or string)\",\"oneOf\":[{\"type\":\"integer\"},{\"type\":\"string\"}]},\"trend\":{\"description\":\"The price trend direction\",\"enum\":[\"positive\",\"negative\",\"neutral\"],\"type\":\"string\"}},\"type\":\"object\"},\"description\":{\"description\":\"The item examine text\",\"type\":\"string\"},\"icon\":{\"description\":\"The item sprite image URL\",\"type\":\"string\"},\"icon_large\":{\"description\":\"The item detail image URL\",\"type\":\"string\"},\"id\":{\"description\":\"The ItemID\",\"type\":\"integer\"},\"members\":{\"description\":\"Whether the item is members-only\",\"enum\":[\"true\",\"false\"],\"type\":\"string\"},\"name\":{\"description\":\"The item name\",\"type\":\"string\"},\"today\":{\"properties\":{\"price\":{\"description\":\"The item trade price (can be integer or string)\",\"oneOf\":[{\"type\":\"integer\"},{\"type\":\"string\"}]},\"trend\":{\"description\":\"The price trend direction\",\"enum\":[\"positive\",\"negative\",\"neutral\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"description\":\"The item category\",\"type\":\"string\"},\"typeIcon\":{\"description\":\"The item category icon URL\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with OSRS items list\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/m=itemdb_oldschool/api/catalogue/items.json","segments":[{"lit":"m=itemdb_oldschool"},{"lit":"api"},{"lit":"catalogue"},{"lit":"items.json"}],"select":{"exist":["alpha","category","page"]},"transform":{"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"old_school_grand_exchange","name__orig":"old_school_grand_exchange","Name":"OldSchoolGrandExchange","name_":"old_school_grand_exchange","name-":"old-school-grand-exchange","NAME":"OLD_SCHOOL_GRAND_EXCHANGE","index$":1}, {"active":true,"entity":"old_school_grand_exchange","key$":"BasicOldSchoolGrandExchangeFlow","kind":"basic","name":"BasicOldSchoolGrandExchangeFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"old_school_grand_exchange_ref01"}}],"index$":0}]}, 'OldSchoolGrandExchange')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let old_school_grand_exchange_ref01_data = Object.values(setup.data.existing.old_school_grand_exchange)[0] as any

    // LIST
    const old_school_grand_exchange_ref01_ent = client.OldSchoolGrandExchange()
    const old_school_grand_exchange_ref01_match: any = {}

    const old_school_grand_exchange_ref01_list = (await old_school_grand_exchange_ref01_ent.list(old_school_grand_exchange_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/old_school_grand_exchange/OldSchoolGrandExchangeTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = RunescapeApisSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['old_school_grand_exchange01','old_school_grand_exchange02','old_school_grand_exchange03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RUNESCAPE_APIS_TEST_OLD_SCHOOL_GRAND_EXCHANGE_ENTID': idmap,
    'RUNESCAPE_APIS_TEST_LIVE': 'FALSE',
    'RUNESCAPE_APIS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['RUNESCAPE_APIS_TEST_OLD_SCHOOL_GRAND_EXCHANGE_ENTID']

  const live = 'TRUE' === env.RUNESCAPE_APIS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RUNESCAPE_APIS_TEST_OLD_SCHOOL_GRAND_EXCHANGE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new RunescapeApisSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.RUNESCAPE_APIS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
