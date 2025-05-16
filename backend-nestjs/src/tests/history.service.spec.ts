import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { HistoryService } from '../history/history.service';
import { History } from '../history/schemas/history.schema';

describe('HistoryService', () => {
  let service: HistoryService;
  let historyModel: any;

  const mockHistoryModel = {
    findOneAndUpdate: jest.fn(),
    find: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryService,
        {
          provide: getModelToken(History.name),
          useValue: mockHistoryModel,
        },
      ],
    }).compile();

    service = module.get<HistoryService>(HistoryService);
    historyModel = module.get(getModelToken(History.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addToHistory', () => {
    it('should call findOneAndUpdate with correct params', async () => {
      await service.addToHistory('user123', 'word-test');

      expect(historyModel.findOneAndUpdate).toHaveBeenCalledWith(
        { user: 'user123', word: 'word-test' },
        { viewedAt: expect.any(Date) },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
    });
  });

  describe('getUserHistory', () => {
    it('should return history sorted by viewedAt', async () => {
      const mockData = [{ word: 'one' }, { word: 'two' }];
      historyModel.exec.mockResolvedValueOnce(mockData);

      const result = await service.getUserHistory('user123');

      expect(historyModel.find).toHaveBeenCalledWith({ user: 'user123' });
      expect(historyModel.sort).toHaveBeenCalledWith({ viewedAt: -1 });
      expect(result).toEqual(mockData);
    });
  });
});
