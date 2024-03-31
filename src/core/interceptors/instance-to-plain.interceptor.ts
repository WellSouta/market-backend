import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { instanceToPlain } from 'class-transformer'
import { map } from 'rxjs/operators'

import { IAppRequest } from '../../common/interfaces/app-request.interface'

@Injectable()
export class InstanceToPlainInterceptor<T> implements NestInterceptor<T, any> {
  public async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest() as IAppRequest

    return next.handle().pipe(
      map((data) => {
        return instanceToPlain(data, {
          groups: request.auth?.permissions
        })
      })
    )
  }
}
