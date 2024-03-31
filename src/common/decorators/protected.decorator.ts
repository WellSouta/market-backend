import { SetMetadata } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger'

import { DecoratorToken } from '../constants/decorators'
import { Permission } from '../constants/permissions'

/**
 * Makes route or controller protected, requiring both authentication and authorization (if permissions are provided).
 * For Swagger, it adds `ApiBearerAuth` decorator to the route or controller.
 * `ApiResponse` for 401 and 403 statuses is also added, only if decorator is used on a method.
 * @param permissions - Permissions required to access the route or controller. If not provided, only authentication is required.
 */
export function Protected(...permissions: Permission[]): ClassDecorator & MethodDecorator {
  // @ts-expect-error - I do not want to spend time type wrangling and gymnastics needed to please the TS compiler.
  return (target, propertyKey, descriptor) => {
    SetMetadata(DecoratorToken.Protected, permissions)(target, propertyKey, descriptor)
    ApiBearerAuth()(target, propertyKey, descriptor)

    // If the decorator is used on a method, add ApiResponse for 401 and 403 statuses.
    if (typeof propertyKey !== 'undefined' && typeof descriptor !== 'undefined') {
      ApiResponse({ status: 401, description: 'Unauthorized' })(target, propertyKey, descriptor)
      ApiResponse({ status: 403, description: 'Forbidden' })(target, propertyKey, descriptor)
    }
  }
}
