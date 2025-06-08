import { ApiProperty } from "@nestjs/swagger";

export class ValidCodeResponseDTO {

  @ApiProperty({ description: 'validCodeStr' })
  validCodeStr: string;

  @ApiProperty({ description: "请求requestId" })
  requestId: string;

  @ApiProperty({ description: "机主校验pageId，用户机主校验" })
  pageId: string;

  @ApiProperty({ description: "pubx，用于um验证" })
  pubx: string;

  @ApiProperty({ description: "puby，用于um验证" })
  puby: string;

  @ApiProperty({ description: "sharePageCheckFlagUrl" })
  sharePageCheckFlagUrl: string;

}