import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from 'rxjs'
import { ResultDTO } from '../dtos/result.dto';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    return next.handle().pipe(
      map((data) => {
        const resultDTO = new ResultDTO();
        resultDTO.code = 200;
        resultDTO.message = 'success';
        resultDTO.data = data;
        return resultDTO;
      })
    )
  }

}