import { Injectable, Logger } from '@nestjs/common';
import { CustomException } from '../../../common/exceptions/custom.exception';
import { md5Hash } from '../../../common/utils/crypto.util';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../user/repositories/user.repository';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userRepository.getUserByUm(username);
    if (!user) {
      throw new CustomException('user is not exist!');
    }
    const md5Pwd = await md5Hash(password);
    if (md5Pwd !== user.password) {
      throw new CustomException('password is wrong!');
    }
    return user;
  }

  async login(user: User): Promise<string> {
    const playload = {
      username: user.username,
      sub: user.id,
    };
    return await this.jwtService.sign(playload);
  }
}
