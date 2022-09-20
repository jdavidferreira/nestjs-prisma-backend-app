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
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { User, UserRole } from '@prisma/client'

import { UserService } from './user.service'
import { CreateUserDto, UpdateUserDto } from './dto'
import { UserEntity } from './entities/user.entity'
import { Roles } from 'src/decorators/roles.decorator'
import { RolesGuard } from 'src/guards/roles.guard'

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOkResponse({ type: [UserEntity] })
  async findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOkResponse({ type: UserEntity })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.userService.findById(id)

    if (!user) {
      throw new NotFoundException()
    }

    return user
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user)
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOkResponse({ type: UserEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, user)
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOkResponse({ type: UserEntity })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id)
  }
}
