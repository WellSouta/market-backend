import { SetMetadata } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'

import { DecoratorToken } from '../constants/decorators'
import { Permission } from '../constants/users'

/**
 * Protects a route with the specified permissions.
 * Also applies `ApiBearerAuth` decorator for Swagger.
 */
export function Protected(...permissions: Permission[]): ClassDecorator & MethodDecorator {
  // @ts-expect-error - Avoid
  return (target, propertyKey, descriptor) => {
    ApiBearerAuth()(target, propertyKey, descriptor)
    SetMetadata(DecoratorToken.Protected, permissions)(target, propertyKey, descriptor)
  }
}
