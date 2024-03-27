import { Module } from '@nestjs/common'
import { CoreModule } from './core/core.module'
import { CategoryModule } from './features/categories/category.module'
import { ProductModule } from './features/products/product.module'
import { UserModule } from './features/users/user.module'

@Module({
  imports: [CoreModule, CategoryModule, ProductModule, UserModule]
})
export class AppModule {}
