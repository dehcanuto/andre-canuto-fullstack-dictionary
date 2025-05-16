import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from '../users/users.controller';
import { UsersService } from '../users/users.service';
import { FavoriteService } from '../favorite/favorite.service';
import { HistoryService } from '../history/history.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: Partial<UsersService>;
  let favoriteService: Partial<FavoriteService>;
  let historyService: Partial<HistoryService>;

  const mockUser = {
    _id: '64cf403a3a4cddfa1f9c1234',
    name: 'Test User',
    email: 'test@example.com',
  };

  beforeEach(async () => {
    usersService = {
      findOne: jest.fn().mockResolvedValue(mockUser),
    };

    favoriteService = {
      getAllFavorites: jest.fn().mockResolvedValue(['word1', 'word2']),
    };

    historyService = {
      getUserHistory: jest.fn().mockResolvedValue(['history1', 'history2']),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: usersService },
        { provide: FavoriteService, useValue: favoriteService },
        { provide: HistoryService, useValue: historyService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should return user profile', async () => {
    const req = { user: { email: 'test@example.com' } };

    const result = await controller.getProfile(req);

    expect(result).toEqual({
      id: mockUser._id,
      name: mockUser.name,
      email: mockUser.email,
    });
    expect(usersService.findOne).toHaveBeenCalledWith('test@example.com');
  });

  it('should return user history', async () => {
    const req = { user: { userId: mockUser._id } };

    const result = await controller.getHistory(req);

    expect(result).toEqual(['history1', 'history2']);
    expect(historyService.getUserHistory).toHaveBeenCalledWith(mockUser._id);
  });

  it('should return user favorites', async () => {
    const req = { user: { userId: mockUser._id } };

    const result = await controller.getFavorites(req);

    expect(result).toEqual(['word1', 'word2']);
    expect(favoriteService.getAllFavorites).toHaveBeenCalledWith(mockUser._id);
  });
});
