import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { History, HistorySchema } from './schemas/history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }])
  ],
  providers: [HistoryService],
  controllers: [HistoryController],
  exports: [HistoryService]
})
export class HistoryModule {}
