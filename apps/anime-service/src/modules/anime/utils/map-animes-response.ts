import { RpcException } from '@nestjs/microservices';

import { AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';

import { JikanAnime, JikanResponse } from '@shared/dto/anime/jikan-api.dto';

export const mapAnimesResponse = (
  response: AxiosResponse<JikanResponse>,
): JikanAnime[] => {
  const { data } = response.data;

  if (!data) throw new RpcException('Something went wrong...');

  const mapped = data.map((anime) =>
    plainToClass(JikanAnime, anime, {
      excludeExtraneousValues: true,
    }),
  );

  return mapped.filter((anime) => anime.name && anime.picture);
};
