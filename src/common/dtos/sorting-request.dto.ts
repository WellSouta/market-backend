import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsString } from 'class-validator'

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export class SortedRequestDto {
  @ApiProperty({
    type: 'string',
    description: 'The field to sort by',
    required: false
  })
  @IsString()
  @IsOptional()
  public field!: string

  @ApiProperty({
    type: 'string',
    description: 'The sort direction',
    required: false,
    enum: SortDirection,
    enumName: 'SortDirection'
  })
  @IsString()
  @IsOptional()
  @IsEnum(SortDirection)
  public order!: SortDirection
}
