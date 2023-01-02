import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common'
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { UserRole } from '@prisma/client'

import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { RolesGuard } from 'src/guards/roles.guard'
import { Roles } from 'src/decorators/roles.decorator'
import { ConnectionArgs } from 'src/lib/page/connection-args.dto'
import { Page } from 'src/lib/page/page.dto'
import { OrderEntity } from './entities/order.entity'
import { ApiPageResponse } from 'src/lib/page/api-page-response.decorator'

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@ApiExtraModels(Page) // 👈 required to generate types for Page
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto)
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  findAll() {
    return this.ordersService.findAll()
  }

  @Get('page')
  @ApiPageResponse(OrderEntity)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  findAllByPage(@Query() connectionArgs: ConnectionArgs) {
    return this.ordersService.findAllByPage(connectionArgs)
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.TECHNICIAN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id)
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto)
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.delete(id)
  }
}
