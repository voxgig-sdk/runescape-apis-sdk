

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"name","req":false,"short":"The player's username","type":"`$STRING`","index$":0},{"active":true,"name":"rank","req":false,"short":"The player's rank","type":"`$STRING`","index$":1},{"active":true,"name":"score","req":false,"short":"The player's score or experience","type":"`$STRING`","index$":2}],"name":"player_ranking","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"category","orig":"category","reqd":true,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"query","name":"size","orig":"size","reqd":true,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"table","orig":"table","reqd":true,"type":"`$INTEGER`","index$":2}]},"contract":{"id":"GET /m=hiscore/ranking.json","json":"{\"operationId\":\"getPlayerRankings\",\"parameters\":[{\"description\":\"The skill, overall level, or activity table number\",\"in\":\"query\",\"name\":\"table\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Category type (0 for skills, 1 for activities)\",\"in\":\"query\",\"name\":\"category\",\"required\":true,\"schema\":{\"enum\":[0,1],\"type\":\"integer\"}},{\"description\":\"Number of players to return (max 50)\",\"in\":\"query\",\"name\":\"size\",\"required\":true,\"schema\":{\"maximum\":50,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"name\":{\"description\":\"The player's username\",\"type\":\"string\"},\"rank\":{\"description\":\"The player's rank\",\"type\":\"string\"},\"score\":{\"description\":\"The player's score or experience\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with player rankings\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/m=hiscore/ranking.json","segments":[{"lit":"m=hiscore"},{"lit":"ranking.json"}],"select":{"exist":["category","size","table"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"player_ranking","name__orig":"player_ranking","Name":"PlayerRanking","name_":"player_ranking","name-":"player-ranking","NAME":"PLAYER_RANKING","index$":2}, {"active":true,"entity":"player_ranking","key$":"BasicPlayerRankingFlow","kind":"basic","name":"BasicPlayerRankingFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"player_ranking_ref01"}}],"index$":0}]}, 'PlayerRanking')
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
  
