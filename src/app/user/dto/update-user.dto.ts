import { UserRole } from '@prisma/client'

export class UpdateUserDto {
  firstName?: string
  lastName?: string
  email?: string
  role?: UserRole
  isLoggedIn?: boolean
  // TODO: find out how to update this relations
  // technicianOrders?: Array<number>
  // managerOrders?: Array<number>
}
