import { User, UserRole } from '@prisma/client'
import bcrypt from 'bcrypt'

export function createRandomUser(): User {
  return {
    id: 1,
    firstName: 'firstNameTest',
    lastName: 'lastNameTest',
    email: 'test@email.com',
    role: UserRole.TECHNICIAN,
    isLoggedIn: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    password: bcrypt.hashSync('123456', 10),
  } as const
}
