import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
  ],
  controllers: [AnimeController],
  providers: [AnimeService],
})
export class AnimeModule {}
