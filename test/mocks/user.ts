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
    password: bcrypt.hashSync('123456', 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  } as const
}
