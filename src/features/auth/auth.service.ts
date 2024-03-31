import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import assert from 'node:assert'

import { Permission } from '../../common/constants/permissions'
import { hashPassword, verifyPassword } from '../../common/utils/password'
import { User } from '../../entities/user.entity'
import { UserService } from '../users/user.service'

export interface IAuthenticateParams {
  token: string
}

export interface IAuthorizeParams {
  user: User
  requiredPermissions: Permission[]
}

export interface IAuthLoginParams {
  username: string
  password: string
}

export interface IAuthLoginResult {
  token: string
  user: User
  permissions: Permission[]
}

export interface IAuthRegisterParams {
  firstName: string
  lastName: string
  phoneNumber: string
  username: string
  password: string
}

export interface IAuthRegisterResult {
  token: string
  user: User
  permissions: Permission[]
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
    const userPermissions = this.userService.getUserPermissions(params.user)

    return params.requiredPermissions.every((permission) => userPermissions.includes(permission))
  }

  public async login(params: IAuthLoginParams): Promise<IAuthLoginResult> {
    let user = await this.userService.get({
      username: params.username
    })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordValid = await verifyPassword(params.password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    // Update user with roles
    user = await this.userService.get({
      id: user.id,
      opts: {
        relations: {
          roles: {
            role: true
          }
        }
      }
    })

    const token = this.jwtService.sign({
      id: user!.id
    })

    return {
      token,
      user: user!,
      permissions: this.userService.getUserPermissions(user!)
    }
  }

  public async register(params: IAuthRegisterParams): Promise<IAuthRegisterResult> {
    const isUserExists = await this.userService.exists({
      username: params.username
    })

    if (isUserExists) {
      throw new UnauthorizedException('User already exists')
    }

    const user = await this.userService.create({
      firstName: params.firstName,
      lastName: params.lastName,
      phoneNumber: params.phoneNumber,
      username: params.username,
      hashedPassword: await hashPassword(params.password)
    })

    const token = this.jwtService.sign({
      id: user.id
    })

    return {
      token,
      user,
      permissions: []
    }
  }
}
