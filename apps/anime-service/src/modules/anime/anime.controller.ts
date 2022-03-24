import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { KafkaTopics } from '@shared/constants/kafka-topics';

import { CreateAnimeRequest } from '@shared/dto/anime/create-anime.dto';
import { UpdateAnimeRequest } from '@shared/dto/anime/update-anime.dto';

import { ParseMessagePipe } from '@shared/pipes/parse-message.pipe';

import { AnimeService } from './anime.service';

@Controller()
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @MessagePattern(KafkaTopics.ANIME.GET_ANIMES_API)
  async getAnimesByName(@Payload(new ParseMessagePipe()) name: string) {
    return this.animeService.getAnimesByName(name);
  }

  @MessagePattern(KafkaTopics.ANIME.FIND_ALL)
  async findAllByUser(@Payload(new ParseMessagePipe()) userId: string) {
    return this.animeService.findAllByUser(userId);
  }

  @MessagePattern(KafkaTopics.ANIME.CREATE)
  async create(@Payload(new ParseMessagePipe()) data: CreateAnimeRequest) {
    return this.animeService.create(data);
  }

  @MessagePattern(KafkaTopics.ANIME.UPDATE)
  async update(@Payload(new ParseMessagePipe()) data: UpdateAnimeRequest) {
    return this.animeService.update(data.id, data);
  }

  @MessagePattern(KafkaTopics.ANIME.REMOVE)
  async remove(@Payload(new ParseMessagePipe()) id: string) {
    return this.animeService.remove(id);
  }
}