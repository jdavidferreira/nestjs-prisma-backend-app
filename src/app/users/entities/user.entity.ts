import { ApiProperty } from '@nestjs/swagger'
import { User, UserRole } from '@prisma/client'

export class UserEntity implements User {
  @ApiProperty()
  id!: number

  @ApiProperty()
  firstName!: string

  @ApiProperty()
  lastName!: string

  @ApiProperty()
  email!: string

  @ApiProperty({
    enum: UserRole,
    enumName: 'UserRole',
    default: UserRole.TECHNICIAN,
  })
  role!: UserRole

  @ApiProperty({ default: false })
  isLoggedIn!: boolean

  @ApiProperty()
  createdAt!: Date

  @ApiProperty()
  updatedAt!: Date | null
}
