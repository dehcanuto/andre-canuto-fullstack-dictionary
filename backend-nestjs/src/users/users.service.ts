import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // TODO: Provisório
  async findAll(): Promise<User | null> {
    return this.userModel.find().lean();
  }

  async findOne(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).lean();
  }

  async create(user: Partial<User>): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
}
