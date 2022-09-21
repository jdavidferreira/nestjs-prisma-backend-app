import { Test, TestingModule } from '@nestjs/testing'
import { PrismaModule } from 'src/prisma/prisma.module'
import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'

describe('OrdersController', () => {
  let controller: OrdersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
      imports: [PrismaModule],
    }).compile()

    controller = module.get<OrdersController>(OrdersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
