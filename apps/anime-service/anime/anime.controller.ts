import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ParseMessagePipe } from '@shared/pipes/parse-message.pipe';

import { AnimeService } from './anime.service';

@Controller()
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}
}
