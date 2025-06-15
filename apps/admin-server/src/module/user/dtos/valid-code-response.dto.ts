import { ApiProperty } from '@nestjs/swagger';

export class ValidCodeResponseDTO {
  @ApiProperty({ description: 'validCodeStr' })
  validCodeStr: string;

  @ApiProperty({ description: 'Request ID' })
  requestId: string;

  @ApiProperty({ description: 'Page ID for owner verification' })
  pageId: string;

  @ApiProperty({ description: 'pubx for um verification' })
  pubx: string;

  @ApiProperty({ description: 'puby for um verification' })
  puby: string;

  @ApiProperty({ description: 'sharePageCheckFlagUrl' })
  sharePageCheckFlagUrl: string;
}
