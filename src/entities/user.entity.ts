import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { Column, Entity, OneToMany } from 'typeorm'
import { EntityBase } from './common/entity-base'
import { UserPersonalField } from './fields/user-personal.field'
import { UserRole } from './user-role.entity'

@Entity('users')
export class User extends EntityBase {
  @ApiProperty({
    type: 'string',
    description: 'Username'
  })
  @Column('varchar', {
    unique: true
  })
  public username!: string

  @Column('varchar')
  @Exclude()
  public password!: string

  @ApiProperty({
    type: UserPersonalField,
    description: 'Personal information'
  })
  @Column('jsonb')
  public personal!: UserPersonalField

  @ApiProperty({
    type: 'string',
    description: 'Phone number'
  })
  @Column('varchar')
  public phoneNumber!: string

  @ApiProperty({
    type: () => UserRole,
    description: 'User roles'
  })
  @OneToMany(() => UserRole, (role) => role.user)
  public roles!: UserRole[]
}
