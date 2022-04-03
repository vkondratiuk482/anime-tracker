import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, INestMicroservice } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import * as setCookie from 'set-cookie-parser';

import { AppModule as ApiGatewayModule } from '../src/app.module';
import { AppModule as AuthModule } from '../../auth-service/src/app.module';
import { AppModule as AnimeModule } from '../../anime-service/src/app.module';

describe('Whole app(e2e)', () => {
  let app: INestApplication;
  let authService: INestMicroservice;
  let animeService: INestMicroservice;

  beforeEach(async () => {
    const authModRef = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();
    authService = authModRef.createNestMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'auth-consumer',
        },
      },
    });
    await authService.listen();

    const animeModRef = await Test.createTestingModule({
      imports: [AnimeModule],
    }).compile();
    animeService = animeModRef.createNestMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'anime-consumer',
        },
      },
    });
    await animeService.listen();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiGatewayModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.use(cookieParser());

    await app.startAllMicroservices();
    await app.init();
  });

  it('Successfully create a user and make a call for authorized endpoint with given JWT', async () => {
    const signUpResponse = await request(app.getHttpServer())
      .post('/auth/signUp')
      .send({ email: 'testuser9@gmail.com', password: 'pass1234' })
      .expect(201);

    const { accessToken } = signUpResponse.body;

    expect(accessToken).toMatch(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/, //jwt regExp
    );

    return request(app.getHttpServer())
      .get('/anime')
      .set('Authorization', 'Bearer ' + accessToken)
      .expect([]);
  });

  it('Successfully sign in and make a call for authorized endpoint with given JWT', async () => {
    const signInResponse = await request(app.getHttpServer())
      .post('/auth/signIn')
      .send({ email: 'testuser2@gmail.com', password: 'pass1234' })
      .expect(201);

    const { accessToken } = signInResponse.body;

    expect(accessToken).toMatch(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/, //jwt regExp
    );

    return request(app.getHttpServer())
      .get('/anime')
      .set('Authorization', 'Bearer ' + accessToken)
      .expect([]);
  });

  it('Successfully sign in and then update access token using refresh token from cookies', async () => {
    const signInResponse = await request(app.getHttpServer())
      .post('/auth/signIn')
      .send({ email: 'testuser3@gmail.com', password: 'pass1234' })
      .expect(201);

    // extract refresh token from cookies
    const cookies = setCookie.parse(signInResponse.headers['set-cookie'], {
      map: true,
    });
    const refreshToken = cookies.refreshToken && cookies.refreshToken.value;

    const updateTokenResponse = await request(app.getHttpServer())
      .post('/auth/update')
      .set('Cookie', [`refreshToken=${refreshToken};`]);

    const { accessToken } = updateTokenResponse.body;

    expect(accessToken).toMatch(
      /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/, //jwt regExp
    );

    return request(app.getHttpServer())
      .get('/anime')
      .set('Authorization', 'Bearer ' + accessToken)
      .expect([]);
  });

  afterEach(async () => {
    await app.close();
    await animeService.close();
    await authService.close();
  });
});
