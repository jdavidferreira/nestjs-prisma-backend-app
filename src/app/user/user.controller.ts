import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { User } from '@prisma/client'
import { UserService } from './user.service'
import { CreateUserDto, UpdateUserDto } from './dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id)
  }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.create(data)
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update({ where: { id }, data })
  }
}
