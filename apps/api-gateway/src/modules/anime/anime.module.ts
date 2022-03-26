import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AuthModule } from '../auth/auth.module';

import { AnimeController } from './anime.controller';

import { AnimeService } from './anime.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ANIME-SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'anime-service',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'anime-consumer',
          },
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [AnimeController],
  providers: [AnimeService],
})
export class AnimeModule {}
