import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm'
import { User } from './entities/user.entity'

interface IConditions {
  id?: string
  conditions?: FindOptionsWhere<User>
}

interface IGetUserListParams extends IConditions {
  opts?: FindManyOptions<User>
}

interface IGetUserParams extends IConditions {
  opts?: FindOneOptions<User>
}

interface IGetUserListWithCountResult {
  items: User[]
  total: number
}

@Injectable()
export class UserService {
  public constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  public getRepo() {
    return this.repo
  }

  public async get(params: IGetUserParams = {}): Promise<User | void> {
    const item = await this.repo.findOne({
      where: this.makeConditions(params),
      ...params.opts
    })

    return item ?? undefined
  }

  public async getList(params: IGetUserListParams = {}): Promise<User[]> {
    return this.repo.find({
      where: this.makeConditions(params),
      ...params.opts
    })
  }

  public async getListWithCount(
    params: IGetUserListParams = {}
  ): Promise<IGetUserListWithCountResult> {
    const [items, total] = await this.repo.findAndCount({
      where: this.makeConditions(params),
      ...params.opts
    })

    return {
      items,
      total
    }
  }

  private makeConditions(params: IConditions): FindOptionsWhere<User> {
    const conditions = params.conditions ?? {}

    if (typeof params.id !== 'undefined') {
      conditions.id = params.id
    }

    return conditions
  }
}
