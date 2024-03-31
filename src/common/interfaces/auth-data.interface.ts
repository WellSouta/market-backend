import type { User } from '../../entities/user.entity'
import type { Permission } from '../constants/permissions'

/** User authentication data */
export interface IAuthData {
  /** Token */
  token: string

  /** User */
  user: User

  /** User permissions */
  permissions: Permission[]
}
