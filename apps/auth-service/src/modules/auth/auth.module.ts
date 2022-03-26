import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from '../user/user.module';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRE },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
