import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async logIn(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })

    if (!user) {
      throw new NotFoundException()
    }

    const isValid = await this.validatePassword(user.password, password)

    if (!isValid) {
      throw new UnauthorizedException()
    }

    const accessToken = this.jwtService.sign({ userId: user.id })

    return { accessToken }
  }

  private validatePassword(userPassword: string, password: string) {
    return bcrypt.compare(password, userPassword)
  }

  validateUser(userId: number) {
    return this.prisma.user.findUnique({ where: { id: userId } })
  }
}
