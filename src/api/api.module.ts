import { Module } from '@nestjs/common'

import { ProviderType } from '../common/constants/providers'
import { TransformToPlainInterceptor } from './interceptors/transform-to-plain.interceptor'
import { CategoryModule } from './modules/categories/category.module'
import { ProductModule } from './modules/products/product.module'
import { UserModule } from './modules/users/user.module'

@Module({
  imports: [UserModule, CategoryModule, ProductModule],
  providers: [{ provide: ProviderType.AppInterceptor, useClass: TransformToPlainInterceptor }]
})
export class ApiModule {}
