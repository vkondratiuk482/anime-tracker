import { Module } from '@nestjs/common';

import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule],
})
export class AppModule {}
