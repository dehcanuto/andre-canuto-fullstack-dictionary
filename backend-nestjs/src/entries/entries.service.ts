import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import axios from 'axios';
import { Entry, EntryDocument } from './schemas/entry.schema';

@Injectable()
export class EntriesService {
  private readonly logger = new Logger(EntriesService.name);
  
  constructor(
    private readonly httpService: HttpService,
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

  async getEntryWord(word: string): Promise<Entry> {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new NotFoundException(`Word "${word}" not found`);
    }
  }

  async addToHistory(userId: string, word: string) {
    return { message: `Palavra "${word}" adicionada no historico de ${userId}` };
  }

  async importWords() {
    const count = await this.entryModel.countDocuments();
    if (count > 0) {
      this.logger.warn('A lista de palavras já foi importada.');
      return { message: "Error message" }
    }

    const url = 'https://raw.githubusercontent.com/meetDeveloper/freeDictionaryAPI/refs/heads/master/meta/wordList/english.txt';
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MyApp/1.0)',
        'Accept': 'text/plain',
      },
    });

    const words = response.data.split('\n').map((w) => w.trim()).filter(Boolean);

    this.logger.log(`Importando ${words.length} palavras...`);

    const batchSize = 1000;
    for (let i = 0; i < words.length; i += batchSize) {
      const batch = words.slice(i, i + batchSize).map((w) => ({ word: w }));
      await this.entryModel.insertMany(batch, { ordered: false }).catch(() => {});
    }

    const responseText = 'Importação concluída!';
    this.logger.log(responseText);
    return { message: responseText }
  }
}
