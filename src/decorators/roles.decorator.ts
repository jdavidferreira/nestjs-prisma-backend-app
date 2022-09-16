import { SetMetadata } from '@nestjs/common'
import { UserRole } from '@prisma/client'
import { AtLeastOne } from 'src/utils/ts'

export const ROLES_KEY = 'roles'

export const Roles = (...roles: AtLeastOne<UserRole>) =>
  SetMetadata(ROLES_KEY, roles)
