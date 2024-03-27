import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { randomUUID } from 'crypto'
import { UserController } from './user.controller'
import { UserService } from './user.service'

describe('UserController', () => {
  let userController: UserController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
    }).compile()

    userController = app.get(UserController)
  })

  describe('/', () => {
    it('should return all users', () => {
      expect(userController.getList()).toBeTruthy()
    })
  })

  describe('/:id', () => {
    it('should throw NotFoundException on unknown user', () => {
      const id = randomUUID()

      expect(userController.get(id)).toThrow(NotFoundException)
    })
  })
})
