import { Role } from '@prisma/client'

export const users = [
  {
    firstName: 'John',
    lasttName: 'Doe',
    email: 'john_doe@email.com',
    role: Role.ADMIN,
  },
  {
    firstName: 'Jane',
    lasttName: 'Doe',
    email: 'jane_doe@email.com',
  },
]
