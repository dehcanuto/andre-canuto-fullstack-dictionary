import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entry, EntryDocument } from './schemas/entry.schema';

@Injectable()
export class EntriesService {
  constructor(
    @InjectModel(Entry.name) private entryModel: Model<EntryDocument>,
  ) {}

  async searchEntries(search: string, limit: number, page: number) {
    const filter = search
      ? { word: { $regex: search, $options: 'i' } }
      : {};

    const totalDocs = await this.entryModel.countDocuments(filter);
    const totalPages = Math.ceil(totalDocs / limit);
    const entries = await this.entryModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .select('word');

    return {
      results: entries.map((entry) => entry.word),
      totalDocs,
      page,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  async getEntry(word: string): Promise<Entry> {
    const entry = await this.entryModel.findOne({ word });
    if (!entry) {
      throw new NotFoundException('Palavra não encontrada');
    }
    return entry;
  }

  async getAllFavorites(userId: string) {
    return { message: `Todos os favoritos do ${userId}` };
  }

  async addToHistory(userId: string, word: string) {
    return { message: `Palavra "${word}" adicionada no historico de ${userId}` };
  }

  async addToFavorites(userId: string, word: string) {
    return { message: `Palavra "${word}" adicionada nos favoritos de ${userId}` };
  }

  async removeFromFavorites(userId: string, word: string) {
    return { message: `Palavra "${word}" removida dos favoritos de ${userId}` };
  }
}
