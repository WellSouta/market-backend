import { Column, Entity, OneToMany } from 'typeorm'
import { IMultiLanguageField } from '../../common/interfaces/multi-language-field.interface'
import { EntityBase } from './common/entity-base'
import { Product } from './product.entity'

@Entity('categories')
export class Category extends EntityBase {
  @Column('varchar')
  public name!: string

  @Column('jsonb')
  public title!: IMultiLanguageField<string>

  @Column('jsonb')
  public description!: IMultiLanguageField<string>

  @OneToMany(() => Product, (product) => product.category)
  public products!: Product[]
}
