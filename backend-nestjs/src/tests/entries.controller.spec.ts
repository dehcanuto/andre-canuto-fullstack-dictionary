import { Test, TestingModule } from '@nestjs/testing';

import { EntriesController } from '../entries/entries.controller';
import { EntriesService } from '../entries/entries.service';
import { FavoriteService } from '../favorite/favorite.service';
import { HistoryService } from '../history/history.service';

describe('EntriesController', () => {
  let controller: EntriesController;
  let entriesService: Partial<Record<keyof EntriesService, jest.Mock>>;
  let favoriteService: Partial<Record<keyof FavoriteService, jest.Mock>>;
  let historyService: Partial<Record<keyof HistoryService, jest.Mock>>;

  beforeEach(async () => {
    entriesService = {
      searchEntries: jest.fn(),
      importWords: jest.fn(),
      getEntryWord: jest.fn(),
    };
    favoriteService = {
      addToFavorites: jest.fn(),
      removeFromFavorites: jest.fn(),
    };
    historyService = {
      addToHistory: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntriesController],
      providers: [
        { provide: EntriesService, useValue: entriesService },
        { provide: FavoriteService, useValue: favoriteService },
        { provide: HistoryService, useValue: historyService },
      ],
    }).compile();

    controller = module.get<EntriesController>(EntriesController);
  });

  describe('search', () => {
    it('should call entriesService.searchEntries with correct params', async () => {
      entriesService.searchEntries.mockResolvedValue(['result']);
      const result = await controller.search('test', 10, 2);
      expect(entriesService.searchEntries).toHaveBeenCalledWith('test', 10, 2);
      expect(result).toEqual(['result']);
    });

    it('should use default values if limit and page not provided', async () => {
      entriesService.searchEntries.mockResolvedValue(['default']);
      const result = await controller.search('word');
      expect(entriesService.searchEntries).toHaveBeenCalledWith('word', 40, 1);
      expect(result).toEqual(['default']);
    });
  });

  describe('importEntries', () => {
    it('should call entriesService.importWords', async () => {
      entriesService.importWords.mockResolvedValue('imported');
      const result = await controller.importEntries();
      expect(entriesService.importWords).toHaveBeenCalled();
      expect(result).toBe('imported');
    });
  });

  describe('getEntry', () => {
    it('should get entry and add to history', async () => {
      const user = { userId: 'user123' };
      entriesService.getEntryWord.mockResolvedValue('entry');
      historyService.addToHistory.mockResolvedValue(undefined);
      const result = await controller.getEntry('word', { user });
      expect(entriesService.getEntryWord).toHaveBeenCalledWith('word');
      expect(historyService.addToHistory).toHaveBeenCalledWith('user123', 'word');
      expect(result).toBe('entry');
    });
  });

  describe('addFavorite', () => {
    it('should add word to favorites', async () => {
      favoriteService.addToFavorites.mockResolvedValue('added');
      const user = { userId: 'user123' };
      const result = await controller.addFavorite('word', { user });
      expect(favoriteService.addToFavorites).toHaveBeenCalledWith('user123', 'word');
      expect(result).toBe('added');
    });
  });

  describe('unfavorite', () => {
    it('should remove word from favorites', async () => {
      favoriteService.removeFromFavorites.mockResolvedValue('removed');
      const user = { userId: 'user123' };
      const result = await controller.unfavorite('word', { user });
      expect(favoriteService.removeFromFavorites).toHaveBeenCalledWith('user123', 'word');
      expect(result).toBe('removed');
    });
  });
});
