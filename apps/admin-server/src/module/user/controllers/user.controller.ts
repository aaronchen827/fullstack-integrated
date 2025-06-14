import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { LoginResponseDTO } from '../dtos/login-response.dto';
import { LoginDTO } from '../dtos/login.dto';
import { AuthService } from '../../auth/services/auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

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
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60 * 24,
      path: '/',
    });
    return new LoginResponseDTO(accessToken);
  }

  @Post('getUser')
  @ApiOperation({ summary: 'getUser' })
  @UseGuards(JwtAuthGuard)
  getUser(@Req() req): any {
    return req.user;
  }

  @Post('loginOut')
  @ApiOperation({ summary: 'loginOut' })
  @UseGuards(JwtAuthGuard)
  loginOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
    return 'success';
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('findAll')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  findAll() {
    return this.userService.findAll();
  }

  @Post('findUser/:id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'Return the user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post('update/:id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User successfully updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Post('delete/:id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
