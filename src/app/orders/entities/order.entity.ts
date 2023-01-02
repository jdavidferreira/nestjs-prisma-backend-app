import { ApiProperty } from '@nestjs/swagger'
import { Order, OrderPriority } from '@prisma/client'

export class OrderEntity implements Order {
  @ApiProperty({ example: 4 })
  id!: number

  @ApiProperty({ required: false, nullable: true, example: 'Fake Street 123' })
  address!: string | null

  @ApiProperty({ example: OrderPriority.MEDIUM })
  priority!: OrderPriority

  @ApiProperty({ example: 3 })
  technicianId!: number

  @ApiProperty({ example: 2 })
  managerId!: number

  @ApiProperty({
    required: false,
    nullable: true,
    type: Date,
    example: new Date().toISOString(),
  })
  executedAt!: Date | null

  @ApiProperty({ example: 1 })
  orderTypeId!: number
}
