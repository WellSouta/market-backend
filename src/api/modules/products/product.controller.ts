import { Controller, Get, NotFoundException, Param } from '@nestjs/common'

import { Product } from '../../../database/entities/product.entity'
import { ProductService } from './product.service'

@Controller('products')
export class ProductController {
  public constructor(private readonly productService: ProductService) {}

  @Get('/')
  public async getList(): Promise<Product[]> {
    return this.productService.getList()
  }

  @Get('/:id')
  public async get(@Param('id') id: string): Promise<Product> {
    const product = await this.productService.get({
      id
    })

    if (!product) {
      throw new NotFoundException()
    }

    return product
  }
}
