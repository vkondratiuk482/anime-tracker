import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CONSTANTS } from '@shared/constants';

import { CreateAnimeRequest } from '@shared/dto/anime/create-anime.dto';
import { UpdateAnimeRequest } from '@shared/dto/anime/update-anime.dto';

import { ParseMessagePipe } from '@shared/pipes/parse-message.pipe';

import { AnimeService } from './anime.service';

@Controller()
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @MessagePattern(CONSTANTS.KAFKA_TOPICS.ANIME.PARSE)
  async parseAnime(@Payload(new ParseMessagePipe()) name: string) {
    return this.animeService.parseAnimes(name);
  }

  @MessagePattern(CONSTANTS.KAFKA_TOPICS.ANIME.FIND_ALL)
  async findAllByUser(@Payload(new ParseMessagePipe()) userId: string) {
    return this.animeService.findAllByUser(userId);
  }

  @MessagePattern(CONSTANTS.KAFKA_TOPICS.ANIME.CREATE)
  async create(@Payload(new ParseMessagePipe()) data: CreateAnimeRequest) {
    return this.animeService.create(data);
  }

  @MessagePattern(CONSTANTS.KAFKA_TOPICS.ANIME.UPDATE)
  async update(@Payload(new ParseMessagePipe()) data: UpdateAnimeRequest) {
    return this.animeService.update(data.id, data);
  }

  @MessagePattern(CONSTANTS.KAFKA_TOPICS.ANIME.REMOVE)
  async remove(@Payload(new ParseMessagePipe()) id: string) {
    return this.animeService.remove(id);
  }
}
