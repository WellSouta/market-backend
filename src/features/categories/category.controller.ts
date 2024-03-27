import { Controller, Get, NotFoundException } from '@nestjs/common'
import { CategoryService } from './category.service'
import { Category } from './entities/category.entity'

@Controller('categories')
export class CategoryController {
  public constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  public async getList(): Promise<Category[]> {
    return this.categoryService.getList()
  }

  @Get('/:id')
  public async get(id: string): Promise<Category> {
    const category = await this.categoryService.get({
      id
    })

    if (!category) {
      throw new NotFoundException()
    }

    return category
  }
}
