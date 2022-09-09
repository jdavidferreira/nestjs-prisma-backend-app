import { ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app/app.module'
import { PrismaClientExceptionFilter } from './filters/prisma-client-exception.filter'
import { PrismaService } from './prisma/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Prisma config
  const prismaService: PrismaService = app.get(PrismaService)
  prismaService.enableShutdownHooks(app)

  // Class validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  // Handle Prisma exceptions using a filter
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Complete App')
    .setDescription('API description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}

bootstrap()
