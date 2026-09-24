
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { RunescapeApisSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = RunescapeApisSDK.test()
    equal(testsdk instanceof RunescapeApisSDK, true,
      'RunescapeApisSDK.test() must return a client synchronously')
  })

})
