import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const { name, description, menuIds } = createRoleDto;

    return this.prisma.role.create({
      data: {
        name,
        description,
        menus: menuIds
          ? {
              connect: menuIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        menus: true,
        users: true,
      },
    });
  }

  async findAll() {
    return this.prisma.role.findMany({
      include: {
        menus: true,
        users: true,
      },
    });
  }

  async findOne(id: number) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: {
        menus: true,
        users: true,
      },
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const { name, description, menuIds } = updateRoleDto;

    // First check if role exists
    const existingRole = await this.prisma.role.findUnique({
      where: { id },
      include: { menus: true },
    });

    if (!existingRole) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return this.prisma.role.update({
      where: { id },
      data: {
        name,
        description,
        menus: menuIds
          ? {
              set: [], // Clear existing menu connections
              connect: menuIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        menus: true,
        users: true,
      },
    });
  }

  async remove(id: number) {
    // First check if role exists and has any users
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: { users: true },
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    if (role.users.length > 0) {
      throw new Error(
        `Cannot delete role with ID ${id} because it has users assigned to it`,
      );
    }

    return this.prisma.role.delete({
      where: { id },
    });
  }

  async assignMenusToRole(roleId: number, menuIds: number[]) {
    // First check if role exists
    const role = await this.prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }

    return this.prisma.role.update({
      where: { id: roleId },
      data: {
        menus: {
          set: [], // Clear existing menu connections
          connect: menuIds.map((id) => ({ id })),
        },
      },
      include: {
        menus: true,
      },
    });
  }
}
