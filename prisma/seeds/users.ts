import { Prisma, UserRole } from '@prisma/client'

export const users: Prisma.UserCreateInput[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john_doe@email.com',
    role: UserRole.ADMIN,
    password: '123456',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane_doe@email.com',
    password: '123456',
  },
]
