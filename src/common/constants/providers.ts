import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'

export enum ProviderType {
  AppInterceptor = APP_INTERCEPTOR,
  AppPipe = APP_PIPE,
  AppFilter = APP_FILTER,
  AppGuard = APP_GUARD
}
