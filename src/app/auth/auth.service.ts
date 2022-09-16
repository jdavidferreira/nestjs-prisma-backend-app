import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcrypt'
import { UserService } from '../users'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async logIn(email: string, password: string) {
    const user = await this.userService.findByEmail(email)

    if (!user) {
      throw new NotFoundException()
    }

    const isValid = await this.validatePassword(user.password, password)

    if (!isValid) {
      throw new UnauthorizedException()
    }

    const accessToken = await this.jwtService.signAsync({ userId: user.id })

    return { accessToken }
  }

  private validatePassword(userPassword: string, password: string) {
    return bcrypt.compare(password, userPassword)
  }

  async validateUser(userId: number) {
    const user = await this.userService.findById(userId)

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
