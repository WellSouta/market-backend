import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import assert from 'node:assert'

import { Permission } from '../../common/constants/users'
import { User } from '../../entities/user.entity'
import { UserService } from '../users/user.service'

export interface IAuthenticateParams {
  token: string
}

export interface IAuthorizeParams {
  user: User
  requiredPermissions: Permission[]
}

@Injectable()
export class AuthService {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  public async authenticate(params: IAuthenticateParams): Promise<User> {
    const payload: unknown = await this.jwtService.verifyAsync(params.token)

    assert(typeof payload === 'object' && payload !== null)
    assert('id' in payload && typeof payload.id === 'string')

    const user = await this.userService.get({
      id: payload.id,
      opts: {
        relations: {
          roles: {
            role: true
          }
        }
      }
    })

    assert(user instanceof User)

    return user
  }

  public async authorize(params: IAuthorizeParams): Promise<boolean> {
    const userPermissions = params.user.roles.reduce((acc, role) => {
      for (const permission of role.role.permissions) {
        acc.add(permission)
      }

      return acc
    }, new Set<Permission>())

    return params.requiredPermissions.every((permission) => userPermissions.has(permission))
  }

  public async register() {
    //
  }

  public async signIn() {
    //
  }

  public async signOut() {
    //
  }
}
