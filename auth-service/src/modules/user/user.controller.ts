import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { Prisma, User } from '@prisma/client';

import { KafkaMessages } from '../../shared/enums/kafka-messages.enum';
import { ParseMessagePipe } from '../../shared/pipes/parse-message.pipe';

import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(KafkaMessages.FIND_ALL)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @MessagePattern(KafkaMessages.FIND_ONE)
  async findOne(@Payload(new ParseMessagePipe()) id: string): Promise<User> {
    return this.userService.findOne({ id });
  }

  @MessagePattern(KafkaMessages.CREATE_ONE)
  async create(
    @Payload(new ParseMessagePipe()) data: Prisma.UserCreateInput,
  ): Promise<User> {
    return this.userService.create(data);
  }
}
