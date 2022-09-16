import { Test, TestingModule } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'

import { PrismaModule } from 'src/prisma/prisma.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModule } from '../users'
import { createRandomUser } from 'test/mocks/user'

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
      const testUser = createRandomUser()
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
