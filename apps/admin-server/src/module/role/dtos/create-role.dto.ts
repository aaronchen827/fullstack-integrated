import { IsString, IsOptional, IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ description: 'Role name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Role description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Menu IDs associated with this role',
    type: [Number],
  })
  @IsArray()
  @IsOptional()
  menuIds?: number[];
}
