import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { User } from '../auth/decorators/user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';

import { CONSTANTS } from '@shared/constants';

import { GetAnimeByNameRequest } from '@shared/dto/anime/get-anime-by-name.dto';
import { CreateAnimeRequest } from '@shared/dto/anime/create-anime.dto';
import { UpdateAnimeRequest } from '@shared/dto/anime/update-anime.dto';

import { AnimeService } from './anime.service';

@Controller('anime')
export class AnimeController implements OnModuleInit {
  constructor(
    @Inject('ANIME-SERVICE') private readonly animeClient: ClientKafka,
    private readonly animeService: AnimeService,
  ) {}

  onModuleInit() {
    for (const topic in CONSTANTS.KAFKA_TOPICS.ANIME) {
      this.animeClient.subscribeToResponseOf(
        CONSTANTS.KAFKA_TOPICS.ANIME[topic],
      );
    }
  }

  @Get('api')
  @UseGuards(JwtGuard)
  async parseAnimes(@Query() { name }: GetAnimeByNameRequest) {
    return this.animeService.parseAnimes(name);
  }

  @Get()
  async findAllByUser(@User() userId: string) {
    return this.animeService.findAllByUser(userId);
  }

  @Post()
  async create(@User() userId: string, @Body() data: CreateAnimeRequest) {
    return this.animeService.create({ ...data, userId });
  }

  @Patch()
  @UseGuards(JwtGuard)
  async update(@Body() data: UpdateAnimeRequest) {
    return this.animeService.update(data);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async remove(@Param('id') id: string) {
    return this.animeService.remove(id);
  }
}
