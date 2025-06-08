import { Body, Controller, Post } from '@nestjs/common';
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
}
