import { Body, Controller, Get, Post, Request } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { Protected } from '../../common/decorators/protected.decorator'
import { IAppRequest } from '../../common/interfaces/app-request.interface'
import { AuthLoginRequestDto, AuthRegisterRequestDto, AuthResponseDto } from './auth.controller.dto'
import { AuthService } from './auth.service'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Get('/me')
  @Protected()
  @ApiOperation({ summary: 'Get current authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Current authenticated user',
    type: AuthResponseDto
  })
  public async getMe(@Request() request: IAppRequest): Promise<AuthResponseDto> {
    return request.auth!
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Login successful', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Login failed' })
  public async login(@Body() body: AuthLoginRequestDto): Promise<AuthResponseDto> {
    const result = await this.authService.login({
      username: body.username,
      password: body.password
    })

    return {
      token: result.token,
      user: result.user,
      permissions: result.permissions
    }
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 200, description: 'Registration successful', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Registration failed' })
  public async register(@Body() body: AuthRegisterRequestDto): Promise<AuthResponseDto> {
    const result = await this.authService.register({
      username: body.username,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
      phoneNumber: body.phoneNumber
    })

    return {
      token: result.token,
      user: result.user,
      permissions: result.permissions
    }
  }
}
