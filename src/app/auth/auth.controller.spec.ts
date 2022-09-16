import { Test, TestingModule } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import bcrypt from 'bcrypt'

import { PrismaModule } from 'src/prisma/prisma.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModule } from '../users'
import { User, UserRole } from '@prisma/client'

describe('AuthController', () => {
  let authController: AuthController
  let authService: DeepMockProxy<AuthService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, JwtService],
      imports: [PrismaModule, UserModule],
    })
      .overrideProvider(AuthService)
      .useValue(mockDeep<AuthService>())
      .compile()

    authController = module.get(AuthController)
    authService = module.get(AuthService)
  })

  it('should be defined', () => {
    expect(authController).toBeDefined()
  })

  describe('logIn', () => {
    test('logs in and returns accessToken', async () => {
      const expected = { accessToken: 'accessToken' }

      authService.logIn.mockResolvedValue(expected)

      const result = await authController.logIn({
        email: testUser.email,
        password: testUser.password,
      })

      expect(result).toBe(expected)
    })
  })
})

export const testUser: User = {
  id: 1,
  firstName: 'firstNameTest',
  lastName: 'lastNameTest',
  email: 'test@email.com',
  role: UserRole.TECHNICIAN,
  isLoggedIn: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  password: bcrypt.hashSync('123456', 10),
} as const
