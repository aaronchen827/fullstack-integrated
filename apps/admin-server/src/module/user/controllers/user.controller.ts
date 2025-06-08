import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { LoginResponseDTO } from '../dtos/login-response.dto';
import { LoginDTO } from '../dtos/login.dto';
import { AuthService } from '../../auth/services/auth.service';
import { Response } from 'express';
import { GetUserResponseDTO } from '../dtos/get-user-response.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'login' })
  async login(
    @Body() dto: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponseDTO> {
    console.log('request api login, param=:', JSON.stringify(dto));
    const user = await this.authService.validateUser(
      dto.username,
      dto.password,
    );
    const accessToken = await this.authService.login(user);
    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
      path: '/',
    });
    return new LoginResponseDTO(accessToken);
  }

  @Post('getUser')
  @ApiOperation({ summary: 'getUser' })
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req): Promise<GetUserResponseDTO> {
    return req.user;
  }

  @Post('loginOut')
  @ApiOperation({ summary: 'loginOut' })
  @UseGuards(JwtAuthGuard)
  async loginOut(@Res({ passthrough: true }) res: Response) {
    await res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
    });
    return 'success';
  }
}
