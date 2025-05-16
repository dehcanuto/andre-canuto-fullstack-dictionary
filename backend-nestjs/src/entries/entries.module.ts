import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { EntriesService } from './entries.service';
import { Entry, EntrySchema } from './schemas/entry.schema';
import { EntriesController } from './entries.controller';
import { FavoriteModule } from '../favorite/favorite.module';
import { HistoryModule } from '../history/history.module';


@Module({
  imports: [
    HttpModule,
    FavoriteModule,
    HistoryModule,
    MongooseModule.forFeature([{ name: Entry.name, schema: EntrySchema }]),
  ],
  controllers: [EntriesController],
  providers: [EntriesService],
  exports: [EntriesService],
})
export class EntriesModule {}
