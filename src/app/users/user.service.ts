import { Prisma, User } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { isString } from 'lodash'
import bcrypt from 'bcrypt'

import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto, UpdateUserDto } from './dto'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(userId: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } })
  }

  findAll(
    params: {
      skip?: number
      take?: number
      cursor?: Prisma.UserWhereUniqueInput
      where?: Prisma.UserWhereInput
      orderBy?: Prisma.UserOrderByWithRelationInput
    } = {},
  ): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params

    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async create(user: CreateUserDto) {
    const data = { ...user }

    data.password = await bcrypt.hash(user.password, 10)

    return this.prisma.user.create({ data })
  }

  async update(id: number, user: UpdateUserDto) {
    const data = { ...user }

    if (isString(user.password)) {
      data.password = await bcrypt.hash(user.password, 10)
    }

    return this.prisma.user.update({ data, where: { id } })
  }

  delete(id: number) {
    return this.prisma.user.delete({ where: { id } })
  }
}
