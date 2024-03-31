import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { EntityBase } from './common/entity-base'
import { Product } from './product.entity'
import { User } from './user.entity'

@Entity('user-favorites')
export class UserFavorite extends EntityBase {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'User ID'
  })
  @Column('uuid')
  public userId!: string

  @ApiProperty({
    type: () => User,
    description: 'Product ID'
  })
  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn()
  public user!: User

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Product ID'
  })
  @Column('uuid')
  public productId!: string

  @ApiProperty({
    type: () => Product,
    description: 'Product'
  })
  @ManyToOne(() => Product, (product) => product.favoritedBy)
  @JoinColumn()
  public product!: Product
}
