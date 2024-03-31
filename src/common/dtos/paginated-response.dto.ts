import { ApiProperty } from '@nestjs/swagger'

export class PaginatedResponseDto<T> {
  @ApiProperty({
    type: 'integer',
    description: 'Total items count'
  })
  public total!: number

  // TODO: Think what to do next
  @ApiProperty({
    type: () => [this]
  })
  public items!: T[]
}
