import { APP_GUARD } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { UserModule } from './users'
import { PrismaModule } from '../prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { OrdersModule } from './orders/orders.module'

@Module({
  imports: [PrismaModule, AuthModule, UserModule, OrdersModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
