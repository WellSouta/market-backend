import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get('/')
  public async getList() {
    return this.userService.getList()
  }

  @Get('/:id')
  public async get(@Param('id') id: string) {
    const user = await this.userService.get({
      id
    })

    if (!user) {
      throw new NotFoundException()
    }

    return user
  }
}
