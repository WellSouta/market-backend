import { Exclude } from 'class-transformer'
import { Column, Entity } from 'typeorm'
import { EntityBase } from './common/entity-base'

export interface IUserPersonal {
  firstName: string
  lastName: string
}

@Entity('users')
export class User extends EntityBase {
  @Column('varchar', {
    unique: true
  })
  public username!: string

  @Column('varchar')
  @Exclude()
  public password!: string

  @Column('jsonb')
  public personal!: IUserPersonal

  @Column('varchar')
  public phoneNumber!: string
}
