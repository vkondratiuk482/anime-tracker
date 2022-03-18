import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { AnimeModule } from './modules/anime/anime.module';

@Module({
  imports: [AuthModule, AnimeModule],
})
export class AppModule {}
