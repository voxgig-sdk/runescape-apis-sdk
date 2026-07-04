
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { RunescapeApisSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('GrandExchangeDatabaseEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RUNESCAPEAPIS_TEST_LIVE=TRUE.
  afterEach(liveDelay('RUNESCAPEAPIS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RunescapeApisSDK.test()
    const ent = testsdk.GrandExchangeDatabase()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RUNESCAPE_APIS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (maybeSkipControl(t, 'entityOp', 'grand_exchange_database.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set RUNESCAPE_APIS_TEST_GRAND_EXCHANGE_DATABASE_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let grand_exchange_database_ref01_data = Object.values(setup.data.existing.grand_exchange_database)[0] as any

    // LIST
    const grand_exchange_database_ref01_ent = client.GrandExchangeDatabase()
    const grand_exchange_database_ref01_match: any = {}

    const grand_exchange_database_ref01_list = await grand_exchange_database_ref01_ent.list(grand_exchange_database_ref01_match)


    // LOAD
    const grand_exchange_database_ref01_match_dt0: any = {}
    grand_exchange_database_ref01_match_dt0.id = grand_exchange_database_ref01_data.id
    const grand_exchange_database_ref01_data_dt0 = await grand_exchange_database_ref01_ent.load(grand_exchange_database_ref01_match_dt0)
    assert(grand_exchange_database_ref01_data_dt0.id === grand_exchange_database_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/grand_exchange_database/GrandExchangeDatabaseTestData.json')

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
    ['grand_exchange_database01','grand_exchange_database02','grand_exchange_database03','graph01','graph02','graph03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['RUNESCAPE_APIS_TEST_GRAND_EXCHANGE_DATABASE_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'RUNESCAPE_APIS_TEST_GRAND_EXCHANGE_DATABASE_ENTID': idmap,
    'RUNESCAPE_APIS_TEST_LIVE': 'FALSE',
    'RUNESCAPE_APIS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['RUNESCAPE_APIS_TEST_GRAND_EXCHANGE_DATABASE_ENTID']

  const live = 'TRUE' === env.RUNESCAPE_APIS_TEST_LIVE

  if (live) {
    client = new RunescapeApisSDK(merge([
      {
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
