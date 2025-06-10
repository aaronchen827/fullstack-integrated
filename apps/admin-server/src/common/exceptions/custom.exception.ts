import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(
    message: string,
    code: number = -1,
    status: HttpStatus = HttpStatus.OK,
  ) {
    super(
      {
        code,
        message,
      },
      status,
    );
  }
}
