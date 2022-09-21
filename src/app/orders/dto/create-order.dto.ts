import { ApiProperty } from '@nestjs/swagger'
import { OrderPriority } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateOrderDto {
  @IsNotEmpty()
  @ApiProperty()
  address!: string

  @IsEnum(OrderPriority)
  @IsOptional()
  @ApiProperty({
    required: false,
    enum: OrderPriority,
    enumName: 'OrderPriority',
    default: OrderPriority.LOW,
  })
  priority!: OrderPriority

  @IsOptional()
  @ApiProperty()
  technicianId?: number

  @IsOptional()
  @ApiProperty()
  managerId?: number

  @ApiProperty()
  orderTypeId!: number
}
