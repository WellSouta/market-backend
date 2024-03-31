import type { Request } from 'express'

import type { IAuthData } from './auth-data.interface'

export interface IAppRequest extends Request {
  auth?: IAuthData
}
