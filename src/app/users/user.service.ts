import { Prisma, User } from '.prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findById(userId: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    })
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

  create(user: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: user })
  }

  update(where: Prisma.UserWhereUniqueInput, user: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ data: user, where })
  }

  delete(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({ where })
  }
}
