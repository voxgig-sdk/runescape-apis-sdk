
import { Context } from './Context'


class RunescapeApisError extends Error {

  isRunescapeApisError = true

  sdk = 'RunescapeApis'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  RunescapeApisError
}

