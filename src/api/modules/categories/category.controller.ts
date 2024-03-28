import { Controller, Get, NotFoundException, Param } from '@nestjs/common'

import { Category } from '../../../database/entities/category.entity'
import { CategoryService } from './category.service'

@Controller('categories')
export class CategoryController {
  public constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  public async getList(): Promise<Category[]> {
    return this.categoryService.getList()
  }

  @Get('/:id')
  public async get(@Param('id') id: string): Promise<Category> {
    const category = await this.categoryService.get({
      id
    })

    if (!category) {
      throw new NotFoundException()
    }

    return category
  }
}
