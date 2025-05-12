import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignupResponseDto } from './dto/signup-response.dto';
import { SigninResponseDto } from './dto/signin-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @ApiBody({ schema: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
  }})
  @ApiOkResponse({
    type: SigninResponseDto,
    description: 'Usuário autenticado com sucesso e JWT retornado',
  })
  async signin(@Body() body: AuthDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new Error('Invalid credentials');

    const token = await this.authService.signin(user);
    return {
      id: user._id.toString(),
      name: user.name,
      token: `Bearer ${token.access_token}`,
    };
  }

  @Post('signup')
  @ApiBody({ schema: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
    },
  }})
  @ApiCreatedResponse({ type: SignupResponseDto, description: 'Usuário criado com sucesso' })
  async signup(@Body() body: CreateUserDto) {
    return this.authService.signup(body);
  }
}
