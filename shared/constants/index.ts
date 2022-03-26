class Index {
  readonly ENDPOINTS = {
    GET_ALL_ANIMES:
      'https://api.jikan.moe/v4/anime?&order_by=title&sort=asc&limit=10&q=',
  };

  readonly KAFKA_TOPICS = {
    AUTH: {
      SIGN_IN: 'sign-in',
      SIGN_UP: 'sign-up',
      VERIFY_TOKEN: 'verify-token',
      UPDATE_TOKEN: 'update-token',
    },
    ANIME: {
      PARSE: 'parse-animes',
      FIND_ALL: 'find-all-animes',
      CREATE: 'create-anime',
      UPDATE: 'update-anime',
      REMOVE: 'remove-anime',
    },
  };
}

export const CONSTANTS = new Index();
