import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient, User, UserRole } from '@prisma/client'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'

import { PrismaModule } from 'src/prisma/prisma.module'
import { PrismaService } from 'src/prisma/prisma.service'
import { createRandomUser } from 'test/mocks/user'
import { CreateUserDto, UpdateUserDto } from './dto'
import { UserService } from './user.service'

describe('UserService', () => {
  let userService: UserService
  let prisma: DeepMockProxy<PrismaClient>
  let testUser: User

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile()

    userService = module.get(UserService)
    prisma = module.get(PrismaService)
    testUser = createRandomUser()
  })

  it('should be defined', () => {
    expect(userService).toBeDefined()
  })

  describe('findById', () => {
    it('returns user', () => {
      prisma.user.findUnique.mockResolvedValueOnce(testUser)

      expect(userService.findById(testUser.id)).resolves.toBe(testUser)
    })
  })

  describe('findByEmail', () => {
    it('returns user', () => {
      prisma.user.findUnique.mockResolvedValueOnce(testUser)

      expect(userService.findByEmail(testUser.email)).resolves.toBe(testUser)
    })
  })

  describe('findAll', () => {
    it('returns users', async () => {
      const testUsers: User[] = [testUser]

      prisma.user.findMany.mockResolvedValueOnce(testUsers)

      const result = await userService.findAll()

      expect(result).toHaveLength(1)
      expect(result).toBe(testUsers)
    })
  })

  describe('create', () => {
    it('creates a user', async () => {
      const userData: CreateUserDto = {
        firstName: 'firstNameTest',
        lastName: 'lastNameTest',
        email: 'test@email.com',
        role: UserRole.TECHNICIAN,
        password: '123456',
      }

      prisma.user.create.mockResolvedValueOnce(testUser)

      const result = await userService.create(userData)

      expect(result).toEqual(testUser)
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          ...userData,
          password: expect.not.stringMatching(userData.password),
        },
      })
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

      prisma.user.update.mockResolvedValueOnce(testUser)

      expect(userService.update({ id: testUser.id }, userData)).resolves.toBe(
        testUser,
      )
    })
  })

  describe('delete', () => {
    it('deletes a user', () => {
      prisma.user.delete.mockResolvedValueOnce(testUser)

      expect(userService.delete({ id: testUser.id })).resolves.toBe(testUser)
    })
  })
})
