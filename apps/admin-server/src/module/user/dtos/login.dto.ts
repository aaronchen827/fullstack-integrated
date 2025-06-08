import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty({ message: 'account cannot be empty' })
  account: string;

  @IsString()
  @IsNotEmpty({ message: 'password cannot be empty' })
  password: string;
}
