import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class UserPersonalField {
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'First name'
  })
  public firstName!: string

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Last name'
  })
  public lastName!: string
}
