import type { User } from '../../entities/user.entity'

export interface IAuthData {
  token: string
  user: User
}
