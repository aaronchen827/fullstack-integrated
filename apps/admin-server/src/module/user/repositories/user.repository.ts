import { User } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async getUserByUm(account: string): Promise<User | null> {
    return await this.prismaService.user.findFirst({
      where: {
        um: account,
      },
    });
  }
}
