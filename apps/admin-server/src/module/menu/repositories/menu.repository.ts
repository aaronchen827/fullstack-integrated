import { Menu, Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AddMenuDTO } from '../dtos/addMenu.dto';

@Injectable()
export class MenuRepository {
  constructor(private prismaService: PrismaService) {}

  async selectById(id: number): Promise<Menu | null> {
    const menu = await this.prismaService.menu.findFirst({
      where: {
        id: id,
      },
    });
    return menu;
  }

  async updateById(addMenuDTO: AddMenuDTO) {
    const { id, ...updateData } = addMenuDTO;
    await this.prismaService.menu.update({
      where: {
        id,
      },
      data: updateData as Prisma.MenuUpdateInput,
    });
  }

  async deleteById(id: number): Promise<void> {
    await this.prismaService.menu.delete({
      where: {
        id,
      },
    });
  }

  async add(addMenuDTO: AddMenuDTO) {
    const { id, ...addData } = addMenuDTO;
    await this.prismaService.menu.create({
      data: addData as unknown as Prisma.MenuCreateInput,
    });
  }

  async selectAll(): Promise<Menu[]> {
    return await this.prismaService.menu.findMany();
  }
}
