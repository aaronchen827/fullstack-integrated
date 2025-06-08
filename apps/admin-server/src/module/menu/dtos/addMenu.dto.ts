import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddMenuDTO {
  @IsInt()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  menuName: string;

  @IsInt()
  @IsNotEmpty()
  parentId: number;

  @IsString()
  @IsOptional()
  icon: string;

  @IsInt()
  showStatus: number;

  @IsInt()
  @IsOptional()
  menuLevel: number;

  @IsString()
  @IsOptional()
  menuUrl: string;

  @IsString()
  path: string;
}
