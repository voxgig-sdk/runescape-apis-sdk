

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


describe('PlayerRankingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RUNESCAPE_APIS_TEST_LIVE=TRUE.
  afterEach(liveDelay('RUNESCAPE_APIS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RunescapeApisSDK.test()
    const ent = testsdk.PlayerRanking()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RUNESCAPE_APIS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'player_ranking.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The player's username","t":"`$STRING`","key$":"name","index$":0},"rank":{"a":true,"h":"Rank","n":"rank","r":false,"sh":"The player's rank","t":"`$STRING`","key$":"rank","index$":1},"score":{"a":true,"h":"Score","n":"score","r":false,"sh":"The player's score or experience","t":"`$STRING`","key$":"score","index$":2}},"name":"player_ranking","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /m=hiscore/ranking.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"category","or":"category","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"size","or":"size","r":true,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"table","or":"table","r":true,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/m=hiscore/ranking.json","q":{"exist":["category","size","table"]},"r":{},"s":[{"lit":"m=hiscore"},{"lit":"ranking.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"player_ranking","name__orig":"player_ranking","Name":"PlayerRanking","name_":"player_ranking","name-":"player-ranking","NAME":"PLAYER_RANKING","index$":2}, {"active":true,"entity":"player_ranking","key$":"BasicPlayerRankingFlow","kind":"basic","name":"BasicPlayerRankingFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"player_ranking_ref01"}}],"index$":0}]}, 'PlayerRanking', {"GET /m=hiscore/ranking.json":{"protocol":"http","operationId":"getPlayerRankings","responses":{"200":{"description":"Successful response with player rankings","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string","description":"The player's username","key$":"name"},"score":{"type":"string","description":"The player's score or experience","key$":"score"},"rank":{"type":"string","description":"The player's rank","key$":"rank"}},"x-ref":"#/components/schemas/PlayerRanking","index$":0}}}}}},"parameters":[{"name":"table","in":"query","required":true,"description":"The skill, overall level, or activity table number","schema":{"type":"integer"},"index$":0},{"name":"category","in":"query","required":true,"description":"Category type (0 for skills, 1 for activities)","schema":{"type":"integer","enum":[0,1]},"index$":1},{"name":"size","in":"query","required":true,"description":"Number of players to return (max 50)","schema":{"type":"integer","minimum":1,"maximum":50},"index$":2}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let player_ranking_ref01_data = Object.values(setup.data.existing.player_ranking)[0] as any

    // LIST
    const player_ranking_ref01_ent = client.PlayerRanking()
    const player_ranking_ref01_match: any = {}

    const player_ranking_ref01_list = (await player_ranking_ref01_ent.list(player_ranking_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/player_ranking/PlayerRankingTestData.json')

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
    ['player_ranking01','player_ranking02','player_ranking03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RUNESCAPE_APIS_TEST_PLAYER_RANKING_ENTID': idmap,
    'RUNESCAPE_APIS_TEST_LIVE': 'FALSE',
    'RUNESCAPE_APIS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['RUNESCAPE_APIS_TEST_PLAYER_RANKING_ENTID']

  const live = 'TRUE' === env.RUNESCAPE_APIS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RUNESCAPE_APIS_TEST_PLAYER_RANKING_ENTID']
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
  
