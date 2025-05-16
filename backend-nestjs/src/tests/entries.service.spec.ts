import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { of, throwError } from 'rxjs';

import { EntriesService } from '../entries/entries.service';

describe('EntriesService', () => {
  let service: EntriesService;
  let httpService: Partial<Record<keyof HttpService, jest.Mock>>;
  let entryModel: any;

  beforeEach(async () => {
    httpService = {
      get: jest.fn(),
    };

    entryModel = {
      countDocuments: jest.fn(),
      find: jest.fn(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      select: jest.fn(),
      insertMany: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntriesService,
        { provide: HttpService, useValue: httpService },
        { provide: getModelToken('Entry'), useValue: entryModel },
      ],
    }).compile();

    service = module.get<EntriesService>(EntriesService);
  });

  describe('searchEntries', () => {
    it('should return paginated entries', async () => {
      entryModel.countDocuments.mockResolvedValue(3);
      entryModel.find.mockReturnThis();
      entryModel.skip.mockReturnThis();
      entryModel.limit.mockReturnThis();
      entryModel.select.mockResolvedValue([{ word: 'apple' }, { word: 'banana' }, { word: 'cherry' }]);

      const result = await service.searchEntries('a', 2, 1);

      expect(entryModel.countDocuments).toHaveBeenCalledWith({ word: { $regex: 'a', $options: 'i' } });
      expect(entryModel.find).toHaveBeenCalledWith({ word: { $regex: 'a', $options: 'i' } });
      expect(result).toEqual({
        results: ['apple', 'banana', 'cherry'],
        totalDocs: 3,
        page: 1,
        totalPages: 2,
        hasNext: true,
        hasPrev: false,
      });
    });
  });

  describe('getEntryWord', () => {
    it('should return word data when api call is successful', async () => {
      const mockResponse = { data: { word: 'test' } };
      httpService.get.mockReturnValue(of(mockResponse));
      const result = await service.getEntryWord('test');
      expect(httpService.get).toHaveBeenCalledWith('https://api.dictionaryapi.dev/api/v2/entries/en/test');
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw NotFoundException when api call fails', async () => {
      httpService.get.mockReturnValue(throwError(() => new Error('fail')));
      await expect(service.getEntryWord('fail')).rejects.toThrow('Word "fail" not found');
    });
  });

  describe('addToHistory', () => {
    it('should return success message', async () => {
      const result = await service.addToHistory('userId', 'word');
      expect(result).toEqual({ message: 'Palavra "word" adicionada no historico de userId' });
    });
  });

  describe('importWords', () => {
    it('should warn and return message if words already imported', async () => {
      entryModel.countDocuments.mockResolvedValue(1);
      const loggerWarnSpy = jest.spyOn(service['logger'], 'warn').mockImplementation(() => {});
      const result = await service.importWords();
      expect(loggerWarnSpy).toHaveBeenCalledWith('A lista de palavras já foi importada.');
      expect(result).toEqual({ message: "Error message" });
      loggerWarnSpy.mockRestore();
    });

    it('should import words in batches when no words imported', async () => {
      entryModel.countDocuments.mockResolvedValue(0);
      const words = ['apple', 'banana', 'cherry'];
      const axiosGetMock = jest.spyOn(require('axios'), 'get').mockResolvedValue({ data: words.join('\n') });
      const loggerLogSpy = jest.spyOn(service['logger'], 'log').mockImplementation(() => {});
      entryModel.insertMany.mockResolvedValue(undefined);

      const result = await service.importWords();

      expect(axiosGetMock).toHaveBeenCalled();
      expect(entryModel.insertMany).toHaveBeenCalled();
      expect(loggerLogSpy).toHaveBeenCalledWith(`Importando ${words.length} palavras...`);
      expect(loggerLogSpy).toHaveBeenCalledWith('Importação concluída!');
      expect(result).toEqual({ message: 'Importação concluída!' });

      axiosGetMock.mockRestore();
      loggerLogSpy.mockRestore();
    });
  });
});
