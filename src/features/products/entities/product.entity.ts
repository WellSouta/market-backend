import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { EntityBase } from '../../../common/entities/entity-base'
import { IMultiLanguageField } from '../../../common/interfaces/multi-language-field.interface'
import { Category } from '../../categories/entities/category.entity'

@Entity('products')
export class Product extends EntityBase {
  @Column('text')
  public name!: string

  @Column('uuid')
  public categoryId!: string

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn()
  public category!: Category

  @Column('jsonb')
  public title!: IMultiLanguageField<string>

  @Column('jsonb')
  public description!: IMultiLanguageField<string>

  @Column('money')
  public price!: number
}
