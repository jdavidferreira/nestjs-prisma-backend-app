import { ApiProperty } from '@nestjs/swagger'
import { UserRole } from '@prisma/client'

export class UpdateUserDto {
  @ApiProperty({ required: false })
  firstName?: string

  @ApiProperty({ required: false })
  lastName?: string

  @ApiProperty({ required: false })
  email?: string

  @ApiProperty({ required: false })
  role?: UserRole

  // TODO: find out how to update this relations
  // technicianOrders?: Array<number>
  // managerOrders?: Array<number>
}
