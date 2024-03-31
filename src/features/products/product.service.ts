import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm'

import { Product } from '../../entities/product.entity'

interface IConditions {
  id?: string
  conditions?: FindOptionsWhere<Product>
}

interface IGetProductParams extends IConditions {
  opts?: FindOneOptions<Product>
}

interface IGetProductListParams extends IConditions {
  opts?: FindManyOptions<Product>
}

interface IGetProductListWithCountResult {
  items: Product[]
  total: number
}

@Injectable()
export class ProductService {
  public constructor(@InjectRepository(Product) private readonly repo: Repository<Product>) {}

  public getRepo() {
    return this.repo
  }

  public async get(params: IGetProductParams = {}): Promise<Product | undefined> {
    const item = await this.repo.findOne({
      where: this.makeConditions(params),
      ...params.opts
    })

    return item ?? undefined
  }

  public async getList(params: IGetProductListParams = {}): Promise<Product[]> {
    return this.repo.find({
      where: this.makeConditions(params),
      ...params.opts
    })
  }

  public async getListWithCount(
    params: IGetProductListParams = {}
  ): Promise<IGetProductListWithCountResult> {
    const [items, total] = await this.repo.findAndCount({
      where: this.makeConditions(params),
      ...params.opts
    })

    return {
      items,
      total
    }
  }

  private makeConditions(params: IConditions): FindOptionsWhere<Product> {
    const conditions = params.conditions ?? {}

    if (typeof params.id !== 'undefined') {
      conditions.id = params.id
    }

    return conditions
  }
}
