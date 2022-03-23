import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ApiLinks } from '@shared/constants/api-links';

import { AnimeController } from './anime.controller';

import { AnimeService } from './anime.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: ApiLinks.getAllAnimesUrl,
      timeout: 5000,
    }),
  ],
  controllers: [AnimeController],
  providers: [AnimeService],
})
export class AnimeModule {}
