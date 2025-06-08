import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ValidCodeDTO {

  @ApiProperty({ description: 'isHidden' })
  @IsString()
  isHidden: string;

  @ApiProperty({ description: 'requestId' })
  requestId: string;

}