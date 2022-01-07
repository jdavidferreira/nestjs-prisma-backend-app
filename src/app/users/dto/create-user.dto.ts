import { ApiProperty } from '@nestjs/swagger'
import { UserRole } from '@prisma/client'

export class CreateUserDto {
  @ApiProperty()
  firstName!: string

  @ApiProperty()
  lastName!: string

  @ApiProperty()
  email!: string

  @ApiProperty({ required: false })
  role?: UserRole
}
