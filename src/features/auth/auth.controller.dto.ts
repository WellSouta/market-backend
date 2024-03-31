import { ApiProperty } from '@nestjs/swagger'

import { IsPhoneNumber, IsString } from 'class-validator'
import { Permission } from '../../common/constants/permissions'
import { IAuthData } from '../../common/interfaces/auth-data.interface'
import { User } from '../../entities/user.entity'

export class AuthResponseDto implements IAuthData {
  @ApiProperty({
    type: 'string',
    description: 'User token'
  })
  public token!: string

  @ApiProperty({
    type: User,
    description: 'User data'
  })
  public user!: User

  @ApiProperty({
    type: 'array',
    enum: Permission
  })
  public permissions!: Permission[]
}

export class AuthLoginRequestDto {
  @ApiProperty({
    type: 'string',
    description: 'Username'
  })
  @IsString()
  public username!: string

  @ApiProperty({
    type: 'string',
    description: 'Password'
  })
  @IsString()
  public password!: string
}

export class AuthRegisterRequestDto {
  @ApiProperty({
    type: 'string',
    description: 'Username'
  })
  @IsString()
  public username!: string

  @ApiProperty({
    type: 'string',
    description: 'Password'
  })
  @IsString()
  public password!: string

  @ApiProperty({
    type: 'string',
    description: 'First name'
  })
  @IsString()
  public firstName!: string

  @ApiProperty({
    type: 'string',
    description: 'Last name'
  })
  @IsString()
  public lastName!: string

  @ApiProperty({
    type: 'string',
    description: 'Phone number'
  })
  @IsString()
  @IsPhoneNumber()
  public phoneNumber!: string
}
