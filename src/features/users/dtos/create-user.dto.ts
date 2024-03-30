import { ApiProperty } from '@nestjs/swagger'
import { IsObject, IsString } from 'class-validator'
import { UserPersonalField } from '../../../entities/fields/user-personal.field'

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Username'
  })
  public username!: string

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Password'
  })
  public password!: string

  @IsObject()
  @ApiProperty({
    description: 'Personal information'
  })
  public personal!: UserPersonalField

  @ApiProperty({
    type: 'string',
    description: 'Phone number'
  })
  public phoneNumber!: string
}
