import { Module } from '@nestjs/common';
import { MenuController } from './controllers/menu.controller';
import { MenuService } from './services/menu.service';
import { MenuRepository } from './repositories/menu.repository';
import { RoleModule } from '../role/role.module';

@Module({
  controllers: [MenuController],
  providers: [MenuService, MenuRepository],
  exports: [MenuService],
  imports: [RoleModule],
})
export class MenuModule {}
