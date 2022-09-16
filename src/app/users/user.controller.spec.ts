import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { User, UserRole } from '@prisma/client'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'

import { PrismaModule } from 'src/prisma/prisma.module'
import { createRandomUser } from 'test/mocks/user'
import { CreateUserDto, UpdateUserDto } from './dto'
import { UserController } from './user.controller'
import { UserService } from './user.service'

describe('UserController', () => {
  let userController: UserController
  let userService: DeepMockProxy<UserService>
  let testUser: User

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: [PrismaModule],
    })
      .overrideProvider(UserService)
      .useValue(mockDeep<UserService>())
      .compile()

    userController = module.get(UserController)
    userService = module.get(UserService)
    testUser = createRandomUser()
  })

  it('is defined', () => {
    expect(userController).toBeDefined()
  })

  describe('findById', () => {
    it('returns user', () => {
      userService.findById.mockResolvedValueOnce(testUser)

      expect(userController.findById(testUser.id)).resolves.toBe(testUser)
    })

    it('throws NotFound error when user does not exist', () => {
      const error = new NotFoundException()

      userService.findById.mockRejectedValueOnce(error)

      expect(userController.findById(testUser.id)).rejects.toThrowError(
        NotFoundException,
      )
    })
  })

  describe('findAll', () => {
    it('returns users', async () => {
      const testUsers: User[] = [testUser]

      userService.findAll.mockResolvedValueOnce(testUsers)

      const result = await userController.findAll()

      expect(result).toHaveLength(1)
      expect(result).toBe(testUsers)
    })
  })

  describe('create', () => {
    it('creates a user', () => {
      const userData: CreateUserDto = {
        firstName: 'firstNameTest',
        lastName: 'lastNameTest',
        email: 'test@email.com',
        role: UserRole.TECHNICIAN,
        password: '12345',
      }

      userService.create.mockResolvedValueOnce(testUser)

      expect(userController.create(userData)).resolves.toBe(testUser)
    })
  })

  describe('update', () => {
    it('updates a user', () => {
      const userData: UpdateUserDto = {
        firstName: 'firstNameTest',
        lastName: 'lastNameTest',
        email: 'test@email.com',
        role: UserRole.TECHNICIAN,
      }

      userService.update.mockResolvedValueOnce(testUser)

      expect(userController.update(testUser.id, userData)).resolves.toBe(
        testUser,
      )
    })
  })

  describe('delete', () => {
    it('deletes a user', () => {
      userService.delete.mockResolvedValueOnce(testUser)

      expect(userController.delete(testUser.id)).resolves.toBe(testUser)
    })
  })
})
