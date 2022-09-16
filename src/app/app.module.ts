import { Module } from '@nestjs/common'
import { UserModule } from './users'
import { PrismaModule } from '../prisma/prisma.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
})
export class AppModule {}
