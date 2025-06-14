import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Password of the user' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Role ID of the user', required: false })
  @IsNumber()
  @IsOptional()
  roleId?: number;
}
