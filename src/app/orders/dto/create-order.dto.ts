import { ApiProperty } from '@nestjs/swagger'
import { OrderPriority } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

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

  @IsNumber()
  @ApiProperty()
  technicianId!: number

  @IsNumber()
  @ApiProperty()
  managerId!: number

  // TODO: pending relationship
  @IsNumber()
  @ApiProperty()
  orderTypeId!: number
}
