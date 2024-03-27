import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { instanceToPlain } from 'class-transformer'
import { map } from 'rxjs/operators'

@Injectable()
export class TransformToPlainInterceptor<T> implements NestInterceptor<T, any> {
  public intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        return instanceToPlain(data)
      })
    )
  }
}
