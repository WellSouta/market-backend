import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  NotImplementedException,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common'

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Permission } from '../../common/constants/permissions'
import { Protected } from '../../common/decorators/protected.decorator'
import { Product } from '../../entities/product.entity'
import { ProductGetListRequestDto } from './product.controller.dto'
import { ProductService } from './product.service'

@ApiTags('Product')
@Controller('products')
export class ProductController {
  public constructor(private readonly productService: ProductService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get list of products' })
  @ApiResponse({ status: 200, description: 'List of products', type: [Product] })
  public async getList(@Query() query: ProductGetListRequestDto): Promise<Product[]> {
    return this.productService.getList()
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: 200, description: 'Requested product', type: Product })
  @ApiResponse({ status: 404, description: 'Product not found' })
  public async get(@Param('id') id: string): Promise<Product> {
    const product = await this.productService.get({
      id
    })

    if (!product) {
      throw new NotFoundException()
    }

    return product
  }

  @Post('/')
  @Protected(Permission.ProductCreate)
  @ApiOperation({ summary: 'Create new product' })
  @ApiResponse({ status: 200, description: 'Product created', type: Product })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  public async create(): Promise<Product> {
    throw new NotImplementedException()
  }

  @Put('/:id')
  @Protected(Permission.ProductEdit)
  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({ status: 204, description: 'Product updated' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  public async update(@Param('id') id: string): Promise<void> {
    throw new NotImplementedException()
  }

  @Delete('/:id')
  @Protected(Permission.ProductDelete)
  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({ status: 204, description: 'Product deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  public async delete(@Param('id') id: string): Promise<void> {
    throw new NotImplementedException()
  }
}
