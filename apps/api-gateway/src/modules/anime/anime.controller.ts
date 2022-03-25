import { Controller, Get, Inject, OnModuleInit, Query } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { AnimeService } from './anime.service';
import { KafkaTopics } from '@shared/constants/kafka-topics';
import { GetAnimeByNameRequest } from '@shared/dto/anime/get-anime-by-name.dto';

@Controller('anime')
export class AnimeController implements OnModuleInit {
  constructor(
    @Inject('ANIME-SERVICE') private readonly animeClient: ClientKafka,
    private readonly animeService: AnimeService,
  ) {}

  onModuleInit() {
    for (const topic in KafkaTopics.ANIME) {
      this.animeClient.subscribeToResponseOf(KafkaTopics.ANIME[topic]);
    }
  }

  @Get('api')
  parseAnimes(@Query() { name }: GetAnimeByNameRequest) {
    return this.animeService.parseAnimes(name);
  }
}
