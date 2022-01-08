import { PartialType } from '@nestjs/swagger'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // TODO: find out how to update this relations
  // technicianOrders?: Array<number>
  // managerOrders?: Array<number>
}
