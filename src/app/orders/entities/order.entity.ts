import { ApiProperty } from '@nestjs/swagger'
import { Order, OrderPriority } from '@prisma/client'

export class OrderEntity implements Order {
  @ApiProperty()
  id!: number

  @ApiProperty({ required: false, nullable: true })
  address!: string | null

  @ApiProperty()
  priority!: OrderPriority

  @ApiProperty()
  technicianId!: number

  @ApiProperty()
  managerId!: number

  @ApiProperty({ required: false, nullable: true })
  executedAt!: Date | null

  @ApiProperty()
  orderTypeId!: number
}
