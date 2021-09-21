import { Controller } from '@nestjs/common'
import { UserService } from '.'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
