import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schema';

describe('UsersService', () => {
  let service: UsersService;
  let mockUserModel: any;

  const mockUser = {
    _id: 'abc123',
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashedpassword',
  };

  beforeEach(async () => {
    mockUserModel = {
      findOne: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue(mockUser),
      }),
      constructor: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: function (data: any) {
            return {
              ...data,
              save: jest.fn().mockResolvedValue({ ...mockUser, ...data }),
            };
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('findOne', () => {
    it('should return a user by email', async () => {
      const userModel = {
        findOne: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue(mockUser),
        }),
      };

      (service as any).userModel = userModel;

      const result = await service.findOne('test@example.com');
      expect(userModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(result).toEqual(mockUser);
    });
  });

  describe('create', () => {
    it('should create and return a new user', async () => {
      const newUser = { name: 'New User', email: 'new@example.com' };

      const result = await service.create(newUser);
      expect(result.name).toBe('New User');
      expect(result.email).toBe('new@example.com');
    });
  });
});
