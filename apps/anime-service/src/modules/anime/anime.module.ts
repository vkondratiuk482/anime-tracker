import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiLinks } from '@shared/constants/api-links';

import { Anime } from '@shared/entities/anime/anime.entity';

import { AnimeController } from './anime.controller';

import { AnimeService } from './anime.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: ApiLinks.getAllAnimesUrl,
      timeout: 5000,
    }),
    TypeOrmModule.forFeature([Anime]),
  ],
  controllers: [AnimeController],
  providers: [AnimeService],
  exports: [AnimeService],
})
export class AnimeModule {}
