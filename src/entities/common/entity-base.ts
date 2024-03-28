import { randomUUID } from 'crypto'
import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm'

export abstract class EntityBase {
  @PrimaryColumn('uuid')
  public id: string = randomUUID()

  @CreateDateColumn({
    type: 'timestamptz'
  })
  public createdAt: Date = new Date()

  @UpdateDateColumn({
    type: 'timestamptz'
  })
  public updatedAt: Date = new Date()
}