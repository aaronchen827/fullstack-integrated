// jwt-auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { CustomException } from '../../../common/exceptions/custom.exception';

const whiteList = [{ path: '/admin/user/login', method: 'POST' }];

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { url, method } = request;
    if (whiteList.some((item) => item.path === url && item.method === method)) {
      return true;
    }

    const token: any = request.cookies['token'];
    if (!token) throw new UnauthorizedException('No token found');
    try {
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload; // 可注入到 controller 中使用
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
