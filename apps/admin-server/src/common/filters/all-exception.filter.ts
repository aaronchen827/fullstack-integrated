import { Catch, ExceptionFilter, Logger, ArgumentsHost, HttpException } from "@nestjs/common";
import { ResultDTO } from '../dtos/result.dto';


@Catch()
export class AllExceptionFilter implements ExceptionFilter {

  private readonly logger = new Logger('AllExceptionFilter');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof HttpException) {
      const resultDTO = new ResultDTO();
      resultDTO.code = exception.getStatus();
      resultDTO.message = exception.message;
      response.status(exception.getStatus()).json(resultDTO);
    }
  }

}