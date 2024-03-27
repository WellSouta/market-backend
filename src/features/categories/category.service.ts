import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm'
import { Category } from './entities/category.entity'

interface IConditions {
  id?: string
  conditions?: FindOptionsWhere<Category>
}

interface IGetCategoryListParams extends IConditions {
  opts?: FindManyOptions<Category>
}

interface IGetCategoryParams extends IConditions {
  opts?: FindOneOptions<Category>
}

interface IGetCategoryListWithCountResult {
  items: Category[]
  total: number
}

@Injectable()
export class CategoryService {
  public constructor(@InjectRepository(Category) private readonly repo: Repository<Category>) {}

  public getRepo() {
    return this.repo
  }

  public async get(params: IGetCategoryParams = {}): Promise<Category | void> {
    const item = await this.repo.findOne({
      where: this.makeConditions(params),
      ...params.opts
    })

    return item ?? undefined
  }

  public async getList(params: IGetCategoryListParams = {}): Promise<Category[]> {
    return this.repo.find({
      where: this.makeConditions(params),
      ...params.opts
    })
  }

  public async getListWithCount(
    params: IGetCategoryListParams = {}
  ): Promise<IGetCategoryListWithCountResult> {
    const [items, total] = await this.repo.findAndCount({
      where: this.makeConditions(params),
      ...params.opts
    })

    return {
      items,
      total
    }
  }

  private makeConditions(params: IConditions): FindOptionsWhere<Category> {
    const conditions = params.conditions ?? {}

    if (typeof params.id !== 'undefined') {
      conditions.id = params.id
    }

    return conditions
  }
}
