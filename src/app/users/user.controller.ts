import {
  NotFoundException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { User } from '@prisma/client'
import { UserService } from './user.service'
import { CreateUserDto, UpdateUserDto } from './dto'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { UserEntity } from './entities/user.entity'

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: [UserEntity] })
  async findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.userService.findById(id)

    if (!user) {
      throw new NotFoundException()
    }

    return user
  }

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.create(data)
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update({ where: { id }, data })
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete({ id })
  }
}
