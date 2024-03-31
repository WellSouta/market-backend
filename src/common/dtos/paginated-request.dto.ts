import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional, Max, Min } from 'class-validator'

const TAKE_MINIMUM = 1
const TAKE_DEFAULT = 10
const TAKE_MAXIMUM = 100

const SKIP_MINIMUM = 0
const SKIP_MAXIMUM = Number.MAX_SAFE_INTEGER
const SKIP_DEFAULT = 0

export class PaginatedRequestDto {
  @ApiProperty({
    type: 'integer',
    description: 'The number of items to take',
    required: false,
    minimum: TAKE_MINIMUM,
    maximum: TAKE_MAXIMUM,
    default: TAKE_DEFAULT
  })
  @IsInt()
  @IsOptional()
  @Min(TAKE_MINIMUM)
  @Max(TAKE_MAXIMUM)
  public take: number = TAKE_DEFAULT

  @ApiProperty({
    type: 'integer',
    description: 'The number of items to skip',
    required: false,
    minimum: SKIP_MINIMUM,
    maximum: SKIP_MAXIMUM,
    default: SKIP_DEFAULT
  })
  @IsInt()
  @IsOptional()
  @Min(SKIP_MINIMUM)
  @Max(SKIP_MAXIMUM)
  public skip: number = SKIP_DEFAULT
}
