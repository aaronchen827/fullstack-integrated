import { IsInt } from 'class-validator';

export class DeleteMenuDTO {
  @IsInt()
  id: number;
}
