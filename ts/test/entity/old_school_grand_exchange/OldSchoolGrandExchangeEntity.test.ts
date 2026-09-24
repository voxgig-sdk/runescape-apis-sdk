

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"current":{"a":true,"h":"Current","n":"current","r":false,"t":"`$OBJECT`","union":{"branches":2,"count":1,"depth":2},"key$":"current","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"The item examine text","t":"`$STRING`","key$":"description","index$":1},"icon":{"a":true,"h":"Icon","n":"icon","r":false,"sh":"The item sprite image URL","t":"`$STRING`","key$":"icon","index$":2},"icon_large":{"a":true,"h":"Icon Large","n":"icon_large","r":false,"sh":"The item detail image URL","t":"`$STRING`","key$":"icon_large","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"The ItemID","t":"`$INTEGER`","key$":"id","index$":4},"members":{"a":true,"h":"Members","n":"members","r":false,"sh":"Whether the item is members-only","t":"`$STRING`","key$":"members","index$":5},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The item name","t":"`$STRING`","key$":"name","index$":6},"today":{"a":true,"h":"Today","n":"today","r":false,"t":"`$OBJECT`","union":{"branches":2,"count":1,"depth":2},"key$":"today","index$":7},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"The item category","t":"`$STRING`","key$":"type","index$":8},"typeIcon":{"a":true,"h":"Type Icon","n":"typeIcon","r":false,"sh":"The item category icon URL","t":"`$STRING`","key$":"typeIcon","index$":9}},"id":{"field":"id","name":"id"},"name":"old_school_grand_exchange","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /m=itemdb_oldschool/api/catalogue/items.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"alpha","or":"alpha","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"category","or":"category","r":true,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"page","or":"page","r":true,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/m=itemdb_oldschool/api/catalogue/items.json","q":{"exist":["alpha","category","page"]},"r":{},"s":[{"lit":"m=itemdb_oldschool"},{"lit":"api"},{"lit":"catalogue"},{"lit":"items.json"}],"t":{"req":"`reqdata`","res":"`body.items`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"old_school_grand_exchange","name__orig":"old_school_grand_exchange","Name":"OldSchoolGrandExchange","name_":"old_school_grand_exchange","name-":"old-school-grand-exchange","NAME":"OLD_SCHOOL_GRAND_EXCHANGE","index$":1}, {"active":true,"entity":"old_school_grand_exchange","key$":"BasicOldSchoolGrandExchangeFlow","kind":"basic","name":"BasicOldSchoolGrandExchangeFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"old_school_grand_exchange_ref01"}}],"index$":0}]}, 'OldSchoolGrandExchange', {"GET /m=itemdb_oldschool/api/catalogue/items.json":{"protocol":"http","operationId":"getOSRSItemsByCategory","responses":{"200":{"description":"Successful response with OSRS items list","content":{"application/json":{"schema":{"type":"object","properties":{"total":{"key$":"total","type":"integer"},"items":{"items":{"properties":{"current":{"properties":{"price":{"description":"The item trade price (can be integer or string)","oneOf":[{"type":"integer"},{"type":"string"}]},"trend":{"description":"The price trend direction","enum":["positive","negative","neutral"],"type":"string"}},"type":"object","x-ref":"#/components/schemas/PriceTrend","key$":"current"},"description":{"description":"The item examine text","type":"string","key$":"description"},"icon":{"description":"The item sprite image URL","type":"string","key$":"icon"},"icon_large":{"description":"The item detail image URL","type":"string","key$":"icon_large"},"id":{"description":"The ItemID","type":"integer","key$":"id"},"members":{"description":"Whether the item is members-only","enum":["true","false"],"type":"string","key$":"members"},"name":{"description":"The item name","type":"string","key$":"name"},"today":{"properties":{"price":{"description":"The item trade price (can be integer or string)","oneOf":[{"type":"integer"},{"type":"string"}]},"trend":{"description":"The price trend direction","enum":["positive","negative","neutral"],"type":"string"}},"type":"object","x-ref":"#/components/schemas/PriceTrend","key$":"today"},"type":{"description":"The item category","type":"string","key$":"type"},"typeIcon":{"description":"The item category icon URL","type":"string","key$":"typeIcon"}},"type":"object","x-ref":"#/components/schemas/Item","index$":0},"key$":"items","type":"array"}}}}}}},"parameters":[{"name":"category","in":"query","required":true,"description":"The category identification number (only 1 category available for OSRS)","schema":{"type":"integer","enum":[1]},"index$":0},{"name":"alpha","in":"query","required":true,"description":"The starting letter for the items (lowercase)","schema":{"type":"string","pattern":"^[a-z]$"},"index$":1},{"name":"page","in":"query","required":true,"description":"The page number beginning at 1","schema":{"type":"integer","minimum":1},"index$":2}],"securitySource":"unspecified"}})
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
  
