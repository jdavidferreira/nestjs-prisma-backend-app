import { Test, TestingModule } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { User } from '@prisma/client'

import { PrismaModule } from 'src/prisma/prisma.module'
import { AuthService } from './auth.service'
import { UserModule, UserService } from '../users'
import { createRandomUser } from 'test/mocks/user'

describe('AuthService', () => {
  let authService: AuthService
  let jwtService: DeepMockProxy<JwtService>
  let userService: DeepMockProxy<UserService>
  let testUser: User

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService],
      imports: [PrismaModule, UserModule],
    })
      .overrideProvider(JwtService)
      .useValue(mockDeep<JwtService>())
      .overrideProvider(UserService)
      .useValue(mockDeep<UserService>())
      .compile()

    authService = module.get(AuthService)
    jwtService = module.get(JwtService)
    userService = module.get(UserService)
    testUser = createRandomUser()
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  describe('logIn', () => {
    it('logs in and returns accessToken', async () => {
      userService.findByEmail.mockResolvedValue(testUser)
      jwtService.signAsync.mockResolvedValue('accessToken')

      const result = await authService.logIn(testUser.email, '123456')

      expect(result).toHaveProperty('accessToken')
    })
  })

  describe('validateUser', () => {
    it('validates and returns user', async () => {
      userService.findById.mockResolvedValue(testUser)

      const result = await authService.validateUser(1)

      expect(result).toBe(testUser)
    })
  })
})
