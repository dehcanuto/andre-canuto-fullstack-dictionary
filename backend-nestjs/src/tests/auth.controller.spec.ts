import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { AuthDto } from '../auth/dto/auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    validateUser: jest.fn(),
    signin: jest.fn(),
    signup: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signin', () => {
    it('should return user data and token on successful signin', async () => {
      const authDto: AuthDto = { email: 'user@teste.com', password: '1234' };
      const user = { _id: 'abc123', name: 'User Teste' };
      const token = { access_token: 'jwt-token' };

      mockAuthService.validateUser.mockResolvedValue(user);
      mockAuthService.signin.mockResolvedValue(token);

      const result = await authController.signin(authDto);

      expect(mockAuthService.validateUser).toHaveBeenCalledWith(authDto.email, authDto.password);
      expect(mockAuthService.signin).toHaveBeenCalledWith(user);
      expect(result).toEqual({
        id: 'abc123',
        name: 'User Teste',
        token: 'Bearer jwt-token',
      });
    });
  });

  describe('signup', () => {
    it('should call signup and return the result', async () => {
      const createUserDto: CreateUserDto = {
        name: 'New User',
        email: 'newuser@teste.com',
        password: '1234',
      };

      const signupResult = { id: 'newid', name: 'New User', email: 'newuser@teste.com' };
      mockAuthService.signup.mockResolvedValue(signupResult);

      const result = await authController.signup(createUserDto);

      expect(mockAuthService.signup).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(signupResult);
    });
  });
});
