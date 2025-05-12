import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';

import { UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { FavoriteService } from '../favorite/favorite.service';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly favoriteService: FavoriteService
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  async getProfile(@Request() req) {
    const user: UserDocument = await this.usersService.findOne(req.user.email);
    if (!user) {
      return { message: 'User not found' };
    }
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me/history')
  async getHistory(@Request() req) {

  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me/favorites')
  async getFavorites(@Request() req) {
    const response = await this.favoriteService.getAllFavorites(req.user.userId);
    return response
  }
}
