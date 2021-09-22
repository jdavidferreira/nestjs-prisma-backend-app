import { Module } from '@nestjs/common'
import { UserModule } from './user'
import { PrismaModule } from './user/prisma.module'

@Module({
  imports: [PrismaModule, UserModule],
})
export class AppModule {}
