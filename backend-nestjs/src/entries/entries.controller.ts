import {
    Controller,
    Get,
    Param,
    Query,
    Post,
    Delete,
    UseGuards,
    Req,
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
  import { EntriesService } from './entries.service';
  import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { FavoriteService } from '../favorite/favorite.service';
  
@ApiTags('Entries')
@Controller('entries/en')
export class EntriesController {
  constructor(
    private entriesService: EntriesService,
    private readonly favoriteService: FavoriteService
  ) {}

  @Get()
  async search(
    @Query('search') search: string,
    @Query('limit') limit = 40,
    @Query('page') page = 1,
  ) {
    return this.entriesService.searchEntries(search, Number(limit), Number(page));
  }

  @Get('import')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async importEntries() {
    const response = await this.entriesService.importWords();
    return response;
  }

  @Get(':word')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getEntry(@Param('word') word: string, @Req() req) {
    const entry = await this.entriesService.getEntryWord(word);
    await this.entriesService.addToHistory(req.user.userId, word);
    return entry;
  }

  @Post(':word/favorite')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async addFavorite(@Param('word') word: string, @Req() req) {
    const response = await this.favoriteService.addToFavorites(req.user.userId, word);
    return response;
  }

  @Delete(':word/unfavorite')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async unfavorite(@Param('word') word: string, @Req() req) {
    const response = await this.favoriteService.removeFromFavorites(req.user.userId, word);
    return response;
  }
}
