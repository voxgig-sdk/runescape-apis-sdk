
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { RunescapeApisSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await RunescapeApisSDK.test()
    equal(null !== testsdk, true)
  })

})
