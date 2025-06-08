import { Module } from '@nestjs/common';
import { AuthService } from '../auth/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/JwtStrategy';
import { UserRepository } from '../user/repositories/user.repository';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'aaron12345',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UserRepository, AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard, JwtModule],
})
export class AuthModule {}
