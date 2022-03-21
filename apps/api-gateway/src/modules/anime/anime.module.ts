import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
})
export class AnimeModule {}
