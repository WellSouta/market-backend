import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, OneToMany } from 'typeorm'
import { EntityBase } from './common/entity-base'
import { MultiLanguageField } from './fields/multi-language.field'
import { Product } from './product.entity'

@Entity('categories')
export class Category extends EntityBase {
  @ApiProperty({
    type: 'string',
    description: 'Category name'
  })
  @Column('varchar')
  public name!: string

  @ApiProperty()
  @Column('jsonb')
  public title!: MultiLanguageField

  @ApiProperty()
  @Column('jsonb')
  public description!: MultiLanguageField

  @OneToMany(() => Product, (product) => product.category)
  public products!: Product[]
}
