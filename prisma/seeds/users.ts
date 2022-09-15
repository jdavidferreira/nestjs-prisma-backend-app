import { Prisma, UserRole } from '@prisma/client'
import bcrypt from 'bcrypt'

export const users: Prisma.UserCreateInput[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john_doe@email.com',
    role: UserRole.ADMIN,
    password: bcrypt.hashSync('123456', 10),
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane_doe@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
]
