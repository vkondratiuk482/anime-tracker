import { CreateAnimeRequest } from '@shared/dto/anime/create-anime.dto';

export type UpdateAnimeRequest = Omit<
  CreateAnimeRequest,
  'userId' | 'startDate'
>;
