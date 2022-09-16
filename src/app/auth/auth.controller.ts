import { Body, Controller, Post } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { SkipAuth } from 'src/decorators/skip-auth.decorator'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { AuthEntity } from './entities/auth.entity'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @SkipAuth() // 🔓
  @ApiOkResponse({ type: AuthEntity })
  logIn(@Body() { email, password }: LoginDto): Promise<AuthEntity> {
    return this.authService.logIn(email, password)
  }
}
