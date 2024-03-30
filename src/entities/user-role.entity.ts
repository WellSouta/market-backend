import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { EntityBase } from './common/entity-base'
import { Role } from './role.entity'
import { User } from './user.entity'

@Entity('user-roles')
export class UserRole extends EntityBase {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'User ID'
  })
  @Column('uuid')
  public userId!: string

  @ApiProperty({
    type: () => User,
    description: 'User'
  })
  @ManyToOne(() => User, (user) => user.roles)
  @JoinColumn()
  public user!: User

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Role ID'
  })
  @Column('uuid')
  public roleId!: string

  @ApiProperty({
    type: () => Role,
    description: 'Role'
  })
  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn()
  public role!: Role
}
