import { Injectable } from '@nestjs/common';
import { AddMenuDTO } from '../dtos/addMenu.dto';
import { MenuRepository } from '../repositories/menu.repository';
import { CustomException } from '../../../common/exceptions/custom.exception';
import { Menu } from '@prisma/client';
import { MenuDTO } from '../dtos/menu.dto';
import { isEmpty } from '../../../common/util/ArrayUtil';
import { DeleteMenuDTO } from '../dtos/delete.dto';
import { RoleService } from 'src/module/role/role.service';

@Injectable()
export class MenuService {
  constructor(
    private menuRepository: MenuRepository,
    private roleService: RoleService,
  ) {}

  async selectAll(): Promise<MenuDTO[]> {
    const menus: Menu[] = await this.menuRepository.selectAll();
    if (isEmpty(menus)) {
      return [];
    }
    const parentList = menus.filter((menu) => menu.parentId === 0);
    const menuDTOs: MenuDTO[] = [];
    parentList.map((menu) => {
      menuDTOs.push(this.covertToRespVo(menu, menus));
    });
    return menuDTOs;
  }

  async selectByRoleId(roleId: number): Promise<MenuDTO[]> {
    const role = await this.roleService.findOne(roleId);
    if (!role) {
      return [];
    }
    const isSuperAdmin = role.name === 'Super Admin';
    if (!isSuperAdmin && isEmpty(role.menus)) {
      return [];
    }
    const menus: Menu[] = await this.menuRepository.selectAll();
    if (isEmpty(menus)) {
      return [];
    }
    const validMenuIds = role.menus.map((menu) => menu.id);
    const parentList = menus.filter((menu) => {
      if (menu.parentId !== 0) {
        return false;
      }
      if (isSuperAdmin) {
        return true;
      }
      return validMenuIds.includes(menu.id);
    });
    const menuDTOs: MenuDTO[] = [];
    parentList.map((menu) => {
      menuDTOs.push(this.covertToRespVo(menu, menus));
    });
    return menuDTOs;
  }

  private covertToRespVo(parentMenu: Menu, menuList: Menu[]): MenuDTO {
    const target = new MenuDTO();
    Object.assign(target, parentMenu);
    target.subList = this.getSubList(parentMenu.id, menuList);
    return target;
  }

  private getSubList(parentId: number, menuList: Menu[]): MenuDTO[] {
    const subList: Menu[] = menuList.filter(
      (menu) => menu.parentId === parentId,
    );
    if (isEmpty(subList)) {
      return [];
    }
    const menuDTOs: MenuDTO[] = [];
    subList.map((menu) => {
      menuDTOs.push(this.covertToRespVo(menu, menuList));
    });
    return menuDTOs;
  }

  async deleteMenuConfig(deleteMenuDTO: DeleteMenuDTO) {
    const isExist = await this.checkIsExist(deleteMenuDTO.id);
    if (!isExist) {
      throw new CustomException('menu is not exist!');
    }
    await this.menuRepository.deleteById(deleteMenuDTO.id);
  }

  async addMenuConfig(addMenuDTO: AddMenuDTO): Promise<void> {
    // validate parentId
    if (
      addMenuDTO.parentId !== 0 &&
      !(await this.checkIsExist(addMenuDTO.parentId))
    ) {
      throw new CustomException('parentMenu is not exist!');
    }
    // validate id
    if (addMenuDTO.id && !(await this.checkIsExist(addMenuDTO.id))) {
      throw new CustomException('menu is not exist!');
    }
    if (addMenuDTO.id) {
      await this.menuRepository.updateById(addMenuDTO);
    } else {
      await this.menuRepository.add(addMenuDTO);
    }
  }

  async checkIsExist(parentId: number) {
    const menu = await this.menuRepository.selectById(parentId);
    console.log(
      'checkIsExist parentId:{}, menu:{}',
      parentId,
      JSON.stringify(menu),
    );
    return menu !== null;
  }
}
