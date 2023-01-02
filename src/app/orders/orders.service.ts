import { Injectable } from '@nestjs/common'
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection'

import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { Prisma } from '@prisma/client'
import { ConnectionArgs } from 'src/lib/page/connection-args.dto'
import { Page } from 'src/lib/page/page.dto'
import { OrderEntity } from './entities/order.entity'

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  create(order: CreateOrderDto) {
    return this.prisma.order.create({ data: order })
  }

  findAll() {
    return this.prisma.order.findMany()
  }

  async findAllByPage(connectionArgs: ConnectionArgs) {
    const where: Prisma.OrderWhereInput = {}

    type RequiredOrderWhereUniqueInput = Required<Prisma.OrderWhereUniqueInput>

    const ordersPage = await findManyCursorConnection<
      RequiredOrderWhereUniqueInput,
      RequiredOrderWhereUniqueInput
    >(
      // 👇 args contain take, skip and cursor
      (args) => {
        return this.prisma.order.findMany({ ...args, where })
      },
      () => this.prisma.order.count({ where }),
      connectionArgs,
      {
        decodeCursor: (cursorString: string) => ({ id: Number(cursorString) }),
      },
    )

    return new Page<OrderEntity>(ordersPage)
  }

  findOne(id: number) {
    return this.prisma.order.findUnique({ where: { id } })
  }

  update(id: number, order: UpdateOrderDto) {
    return this.prisma.order.update({ data: order, where: { id } })
  }

  delete(id: number) {
    return this.prisma.order.delete({ where: { id } })
  }
}
