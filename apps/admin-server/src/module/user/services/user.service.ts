import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import * as bcrypt from 'bcrypt';
import { md5Hash } from 'src/common/utils/crypto.util';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password, roleId } = createUserDto;

    // md5 the password
    const md5Pwd = await md5Hash(password);

    return this.prisma.user.create({
      data: {
        username,
        password: md5Pwd,
        role: roleId
          ? {
              connect: { id: roleId },
            }
          : undefined,
      },
      include: {
        role: {
          include: {
            menus: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        role: {
          include: {
            menus: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        role: {
          include: {
            menus: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { username, password, roleId } = updateUserDto;

    // First check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Prepare update data
    const updateData: any = {};
    if (username) updateData.username = username;
    if (password) updateData.password = await md5Hash(password);
    if (roleId) {
      updateData.role = {
        connect: { id: roleId },
      };
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        role: {
          include: {
            menus: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    // First check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      include: {
        role: {
          include: {
            menus: true,
          },
        },
      },
    });
  }
}
