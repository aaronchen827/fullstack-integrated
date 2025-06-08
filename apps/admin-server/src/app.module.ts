import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { MenuModule } from './module/menu/menu.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './module/auth/guard/jwt-auth.guard';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [UserModule, PrismaModule, MenuModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
