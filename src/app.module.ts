import { Module } from '@nestjs/common'
import { CoreModule } from './core/core.module'
import { AuthModule } from './features/auth/auth.module'
import { CategoryModule } from './features/categories/category.module'
import { ProductModule } from './features/products/product.module'
import { UserModule } from './features/users/user.module'

@Module({
  imports: [CoreModule, AuthModule, UserModule, ProductModule, CategoryModule]
})
export class AppModule {}
