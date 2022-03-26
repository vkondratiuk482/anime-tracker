import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { SignInRequest } from '@shared/dto/auth/sign-in.dto';

import { User } from '@shared/entities/auth/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) throw new RpcException('User does not exist');

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });

    return user;
  }

  async create(data: SignInRequest): Promise<User> {
    const user = await this.userRepository.create(data);

    return this.userRepository.save(user);
  }
}
