import { RpcException } from '@nestjs/microservices';

export const mapAnimes = (response: any) => {
  const { data } = response;

  if (!data) throw new RpcException('Something went wrong...');

  const mappedList = data.map((anime) => {
    if (!anime.title_english || !anime.images?.jpg?.image_url) {
      throw new RpcException('Incorrect data...');
    }

    return {
      name: anime.title_english,
      picture: anime.images.jpg.image_url,
    };
  });

  return mappedList;
};
