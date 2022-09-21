import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  create(order: CreateOrderDto) {
    return this.prisma.order.create({ data: order })
  }

  findAll() {
    return this.prisma.order.findMany()
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
