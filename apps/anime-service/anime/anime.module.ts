import { Module } from '@nestjs/common';

import { AnimeController } from './anime.controller';

import { AnimeService } from './anime.service';

@Module({
  controllers: [AnimeController],
  providers: [AnimeService],
})
export class AnimeModule {}
