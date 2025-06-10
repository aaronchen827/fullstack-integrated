import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty({ message: 'username cannot be empty' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'password cannot be empty' })
  password: string;

  @IsString()
  @IsOptional()
  requestId?: string;
}
