import { ApiProperty } from '@nestjs/swagger'
import { randomUUID } from 'crypto'
import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm'

export abstract class EntityBase {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID'
  })
  @PrimaryColumn('uuid')
  public id: string = randomUUID()

  @ApiProperty({
    type: 'string',
    format: 'date',
    example: '2021-07-01T00:00:00.000Z',
    description: 'Created at'
  })
  @CreateDateColumn({
    type: 'timestamptz'
  })
  public createdAt: Date = new Date()

  @ApiProperty({
    type: 'string',
    format: 'date',
    example: '2021-07-01T00:00:00.000Z',
    description: 'Updated at'
  })
  @UpdateDateColumn({
    type: 'timestamptz'
  })
  public updatedAt: Date = new Date()
}
