import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';

import { CreateAnimeRequest } from '@shared/dto/anime/create-anime.dto';
import { UpdateAnimeRequest } from '@shared/dto/anime/update-anime.dto';

import { Anime } from '@shared/entities/anime/anime.entity';
import { JikanAnime } from '@shared/dto/anime/jikan-api.dto';

import { mapAnimesResponse } from './utils/map-animes-response';

@Injectable()
export class AnimeService {
  constructor(
    @InjectRepository(Anime)
    private readonly animeRepository: Repository<Anime>,
    private readonly httpService: HttpService,
  ) {}

  async parseAnimes(name: string): Promise<JikanAnime[]> {
    const response = await firstValueFrom(this.httpService.get(name));

    const animes = mapAnimesResponse(response);

    return animes;
  }

  async findAllByUser(userId: string) {
    const animes = await this.animeRepository.find({ where: userId });

    return animes;
  }

  async create(data: CreateAnimeRequest) {
    const anime = await this.animeRepository.create(data);

    return this.animeRepository.save(anime);
  }

  async update(id: string, data: UpdateAnimeRequest) {
    const anime = await this.animeRepository.preload({ id, ...data });

    if (!anime) throw new RpcException('Anime does not exist');

    return this.animeRepository.save(anime);
  }

  async remove(id: string) {
    const anime = await this.animeRepository.findOne(id);

    if (!anime) throw new RpcException('Anime does not exist');

    return this.animeRepository.remove(anime);
  }
}
