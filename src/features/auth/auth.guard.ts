import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { DecoratorToken } from '../../common/constants/decorators'
import { Permission } from '../../common/constants/users'
import { AuthService } from './auth.service'

import type { Request } from 'express'
import { User } from '../../entities/user.entity'

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { isProtected, requiredPermissions } = this.getAuthorizationData(context)

    if (!isProtected) {
      return true
    }

    const request =
      context.getType() === 'http' ? context.switchToHttp().getRequest<Request>() : undefined

    if (!request) {
      throw new Error('Unsupported context type')
    }

    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException()
    }

    let user: User | undefined

    try {
      user = await this.authService.authenticate({
        token
      })
    } catch (error) {
      throw new UnauthorizedException()
    }

    if (requiredPermissions.length > 0) {
      const isAuthorized = await this.authService.authorize({
        user,
        requiredPermissions
      })

      if (!isAuthorized) {
        throw new ForbiddenException()
      }
    }

    // TODO: modify Request type to include a user property in a future
    // @ts-expect-error - see TODO
    request['user'] = user

    return true
  }

  private getAuthorizationData(context: ExecutionContext): {
    isProtected: boolean
    requiredPermissions: Permission[]
  } {
    const requiredPermissions = this.reflector.getAllAndOverride<undefined | Permission[]>(
      DecoratorToken.Protected,
      [context.getHandler(), context.getClass()]
    )

    if (typeof requiredPermissions === 'undefined') {
      return {
        isProtected: false,
        requiredPermissions: []
      }
    }

    return {
      isProtected: true,
      requiredPermissions
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
