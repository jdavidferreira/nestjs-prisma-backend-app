import { UserRole } from '@prisma/client'

export const users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john_doe@email.com',
    role: UserRole.ADMIN,
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane_doe@email.com',
  },
]
