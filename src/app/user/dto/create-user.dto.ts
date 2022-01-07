import { UserRole } from '@prisma/client'

export class CreateUserDto {
  firstName!: string
  lastName!: string
  email!: string
  role?: UserRole
}
