import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { History, HistoryDocument } from './schemas/history.schema';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History.name) private historyModel: Model<HistoryDocument>,
  ) {}

  async addToHistory(userId: string, word: string): Promise<void> {
    await this.historyModel.findOneAndUpdate(
      { user: userId, word },
      { viewedAt: new Date() },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  }

  async getUserHistory(userId: string): Promise<History[]> {
    return this.historyModel
      .find({ user: userId })
      .sort({ viewedAt: -1 })
      .exec();
  }
}
