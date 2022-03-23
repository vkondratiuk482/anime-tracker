import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';

import { CreateAnimeRequest } from '@shared/dto/anime/create-anime.dto';
import { UpdateAnimeRequest } from '@shared/dto/anime/update-anime.dto';

import { Anime } from './entities/anime.entity';

import { mapAnimes } from './utils/map-animes-list';

@Injectable()
export class AnimeService {
  constructor(
    @InjectRepository(Anime)
    private readonly animeRepository: Repository<Anime>,
    private readonly httpService: HttpService,
  ) {}

  async getAnimesByName(name: string) {
    const response = await firstValueFrom(this.httpService.get(name));

    const animes = mapAnimes(response);

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
