import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm'

import { User } from '../../entities/user.entity'

interface IConditions {
  id?: string
  username?: string
  phoneNumber?: string
  firstName?: string
  lastName?: string
  conditions?: FindOptionsWhere<User>
}

export interface IGetUserListParams extends IConditions {
  opts?: FindManyOptions<User>
}

export interface IGetUserParams extends IConditions {
  opts?: FindOneOptions<User>
}

export interface IGetUserListWithCountResult {
  items: User[]
  total: number
}

export interface ICreateUserParams {
  firstName: string
  lastName: string
  phoneNumber: string
  username: string
  hashedPassword: string
}

export interface IUpdateUserParams<T> {
  id: string
  data: T
}

export interface IDeleteUserParams {
  id: string
}

@Injectable()
export class UserService {
  public constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  /**
   * Get repository
   */
  public getRepo() {
    return this.repo
  }

  /**
   * Get user
   * @param params - Get user params
   * @returns User
   */
  public async get(params: IGetUserParams = {}): Promise<User | undefined> {
    const item = await this.repo.findOne({
      where: this.makeConditions(params),
      ...params.opts
    })

    return item ?? undefined
  }

  /**
   * Get list of users
   * @param params - Get user list params
   * @returns List of users
   */
  public async getList(params: IGetUserListParams = {}): Promise<User[]> {
    return this.repo.find({
      where: this.makeConditions(params),
      ...params.opts
    })
  }

  /**
   * Get list of users with count
   * @param params - Get user list params
   * @returns List of users with count
   */
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

  /**
   * Check if user exists
   * @param conditions - Conditions to check
   */
  public async exists(conditions: IConditions): Promise<boolean> {
    return this.repo.existsBy(this.makeConditions(conditions))
  }

  /**
   * Create user
   * @param params - Create user params
   * @returns Created user
   */
  public async create(params: ICreateUserParams): Promise<User> {
    const user = this.repo.create({
      username: params.username,
      password: params.hashedPassword,
      phoneNumber: params.phoneNumber,
      personal: {
        firstName: params.firstName,
        lastName: params.lastName
      }
    })

    await this.repo.insert(user)

    return user
  }

  /**
   * Update user
   * @param params - Update user params
   * @returns Only updated fields
   */
  public async update<T extends DeepPartial<User>>(params: IUpdateUserParams<T>): Promise<T> {
    const data = {
      ...params.data
    }

    await this.repo.update(params.id, data)

    return data
  }

  /**
   * Delete user
   * @param params - Delete user params
   * @returns True if user was deleted
   */
  public async delete(params: IDeleteUserParams): Promise<boolean> {
    const result = await this.repo.delete(params.id)

    return Boolean(result.affected)
  }

  private makeConditions(params: IConditions): FindOptionsWhere<User> {
    const conditions = params.conditions ?? {}

    if (typeof params.id !== 'undefined') {
      conditions.id = params.id
    }

    if (typeof params.username !== 'undefined') {
      conditions.username = params.username
    }

    if (typeof params.phoneNumber !== 'undefined') {
      conditions.phoneNumber = params.phoneNumber
    }

    if (typeof params.firstName !== 'undefined' || typeof params.lastName !== 'undefined') {
      conditions.personal = {
        firstName: params.firstName,
        lastName: params.lastName
      }
    }

    return conditions
  }
}
