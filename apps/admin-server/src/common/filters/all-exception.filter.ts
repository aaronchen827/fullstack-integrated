import {
  Catch,
  ExceptionFilter,
  Logger,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ResultDTO } from '../dtos/result.dto';
import { CustomException } from '../exceptions/custom.exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('AllExceptionFilter');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof HttpException) {
      const resultDTO = new ResultDTO();
      const exceptionResponse = exception.getResponse() as any;
      resultDTO.code = exceptionResponse.code || exception.getStatus();
      resultDTO.message = exceptionResponse.message || exception.message;
      response.status(exception.getStatus()).json(resultDTO);
      return;
    }
  }
}
