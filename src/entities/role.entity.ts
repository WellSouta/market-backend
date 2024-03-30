import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, OneToMany } from 'typeorm'
import { Permission } from '../common/constants/users'
import { EntityBase } from './common/entity-base'
import { MultiLanguageField } from './fields/multi-language.field'
import { UserRole } from './user-role.entity'

@Entity('roles')
export class Role extends EntityBase {
  @ApiProperty({
    type: 'string',
    description: 'Unique role name'
  })
  @Column('varchar', {
    unique: true
  })
  public name!: string

  @ApiProperty({
    type: 'string',
    description: 'Role title'
  })
  @Column('jsonb')
  public title!: MultiLanguageField

  @ApiProperty({
    type: 'string',
    description: 'Role description'
  })
  @Column('jsonb')
  public description!: MultiLanguageField

  @ApiProperty({
    type: 'string',
    enum: Permission,
    description: 'Permissions that role has'
  })
  @Column('varchar', {
    array: true
  })
  public permissions!: Permission[]

  @ApiProperty({
    type: () => UserRole,
    description: 'Users with this role'
  })
  @OneToMany(() => UserRole, (user) => user.role)
  public users!: UserRole[]
}
