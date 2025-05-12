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
import { EntriesService } from 'src/entries/entries.service';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly entriesService: EntriesService
  ) {}

  @Post('create')
  async create(@Body() body: { name: string; email: string; password: string }) {
    const user: UserDocument = await this.usersService.create(body);
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

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
    await this.entriesService.getAllFavorites(req.user.userId);
  }
}
