import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

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
  async login(@Body() body: AuthDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new Error('Invalid credentials');
    return this.authService.login(user);
  }

  @Post('signup')
  async register(@Body() body: AuthDto) {
    return this.authService.register(body);
  }
}
