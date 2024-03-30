import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  NotImplementedException,
  Param,
  Post,
  Put
} from '@nestjs/common'

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Permission } from '../../common/constants/users'
import { Protected } from '../../common/decorators/protected.decorator'
import { Category } from '../../entities/category.entity'
import { CategoryService } from './category.service'

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  public constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get list of categories' })
  @ApiResponse({ status: 200, description: 'List of categories', type: [Category] })
  public async getList(): Promise<Category[]> {
    return this.categoryService.getList()
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get category by id' })
  @ApiResponse({ status: 200, description: 'Requested category', type: Category })
  @ApiResponse({ status: 404, description: 'Category not found' })
  public async get(@Param('id') id: string): Promise<Category> {
    const category = await this.categoryService.get({
      id
    })

    if (!category) {
      throw new NotFoundException()
    }

    return category
  }

  @Post('/')
  @Protected(Permission.CategoryCreate)
  @ApiOperation({ summary: 'Create new category' })
  @ApiResponse({ status: 201, description: 'Category created', type: Category })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  public async create(): Promise<Category> {
    throw new NotImplementedException()
  }

  @Put('/:id')
  @Protected(Permission.CategoryEdit)
  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: 200, description: 'Category updated', type: Category })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  public async update(@Param('id') id: string): Promise<void> {
    throw new NotImplementedException()
  }

  @Delete('/:id')
  @Protected(Permission.CategoryDelete)
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 204, description: 'Category deleted' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  public async delete(@Param('id') id: string): Promise<void> {
    throw new NotImplementedException()
  }
}
