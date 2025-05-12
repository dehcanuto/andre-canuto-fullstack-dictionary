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
  
  @ApiTags('Entries')
  @Controller('entries/en')
  export class EntriesController {
    constructor(private entriesService: EntriesService) {}
  
    @Get()
    async search(
      @Query('search') search: string,
      @Query('limit') limit = 10,
      @Query('page') page = 1,
    ) {
      return this.entriesService.searchEntries(search, Number(limit), Number(page));
    }
  
    @Get(':word')
    @UseGuards(JwtAuthGuard)
    async getEntry(@Param('word') word: string, @Req() req) {
      const entry = await this.entriesService.getEntry(word);
      await this.entriesService.addToHistory(req.user.userId, word);
      return entry;
    }

    @Post(':word/favorite')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async addFavorite(@Param('word') word: string, @Req() req) {
      await this.entriesService.addToFavorites(req.user.userId, word);
    }
  
    @Delete(':word/unfavorite')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async unfavorite(@Param('word') word: string, @Req() req) {
        return this.entriesService.removeFromFavorites(req.user.userId, word);
    }
}