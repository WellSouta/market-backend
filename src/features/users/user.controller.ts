import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  NotImplementedException,
  Param,
  Post,
  Put
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { Permission } from '../../common/constants/permissions'
import { Protected } from '../../common/decorators/protected.decorator'
import { User } from '../../entities/user.entity'
import { UserCreateRequestDto } from './user.controller.dto'
import { UserService } from './user.service'

@ApiTags('User')
@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get('/')
  @Protected(Permission.UserRead)
  @ApiOperation({ summary: 'Get list of users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  public async getList() {
    return this.userService.getList()
  }

  @Get('/:id')
  @Protected(Permission.UserRead)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'Requested user', type: User })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not found' })
  public async get(@Param('id') id: string) {
    const user = await this.userService.get({
      id
    })

    if (!user) {
      throw new NotFoundException()
    }

    return user
  }

  @Post('/')
  @Protected(Permission.UserCreate)
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 200, description: 'User created', type: User })
  public async create(@Body() body: UserCreateRequestDto): Promise<User> {
    throw new NotImplementedException()
  }

  @Put('/:id')
  @Protected(Permission.UserEdit)
  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({ status: 204, description: 'User updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  public async update(@Param('id') id: string): Promise<void> {
    throw new NotImplementedException()
  }

  @Delete('/:id')
  @Protected(Permission.UserDelete)
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 204, description: 'User deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  public async delete(@Param('id') id: string): Promise<void> {
    throw new NotImplementedException()
  }
}
