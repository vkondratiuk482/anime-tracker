import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { AuthKafkaMessages } from '../../shared/enums/auth-kafka-messages.enum';

import { CreateUserRequest } from './dto/create-user.dto';

@Controller('auth')
export class AuthController implements OnModuleInit {
  constructor(
    @Inject('AUTH-SERVICE') private readonly authService: ClientKafka,
  ) {}

  onModuleInit() {
    for (const topic in AuthKafkaMessages) {
      this.authService.subscribeToResponseOf(AuthKafkaMessages[topic]);
    }
  }

  @Get()
  async findAll() {
    const users = await this.authService
      .send(AuthKafkaMessages.FIND_ALL, JSON.stringify({}))
      .toPromise();

    return users;
  }

  @Post()
  async create(@Body() data: CreateUserRequest) {
    const user = await this.authService
      .send(AuthKafkaMessages.CREATE_ONE, JSON.stringify(data))
      .toPromise();

    return user;
  }
}
