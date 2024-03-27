import { Exclude } from 'class-transformer'
import { Column, Entity } from 'typeorm'
import { EntityBase } from '../../../common/entities/entity-base'

export class UserPersonal {
  @Column('varchar')
  public firstName!: string

  @Column('varchar')
  public lastName!: string
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

  @Column(() => UserPersonal)
  public personal!: UserPersonal

  @Column('varchar')
  public phoneNumber!: string
}
