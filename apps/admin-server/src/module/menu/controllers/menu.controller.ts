import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { MenuService } from '../services/menu.service';
import { AddMenuDTO } from '../dtos/addMenu.dto';
import { DeleteMenuDTO } from '../dtos/delete.dto';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Post('addMenuConfig')
  @ApiOperation({ summary: 'addMenuConfig' })
  async addMenuConfig(@Body() addMenu: AddMenuDTO): Promise<any> {
    return await this.menuService.addMenuConfig(addMenu);
  }

  @Post('deleteMenuConfig')
  @ApiOperation({ summary: 'deleteMenuConfig' })
  async deleteMenuConfig(@Body() deleteMenuDTO: DeleteMenuDTO): Promise<any> {
    return await this.menuService.deleteMenuConfig(deleteMenuDTO);
  }

  @Post('selectAll')
  @ApiOperation({ summary: 'selectAll' })
  async selectAll(): Promise<any> {
    return await this.menuService.selectAll();
  }

  @Post('selectUserMenu')
  @ApiOperation({ summary: 'selectUserMenu' })
  async selectUserMenu(@Req() req): Promise<any> {
    console.log('selectUserMenu user=', req.user);
    const roleId: number = req?.user?.role;
    if (!roleId) {
      return [];
    }
    return await this.menuService.selectByRoleId(roleId);
  }
}
