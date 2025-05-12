import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Favorite, FavoriteDocument } from './schemas/favorite.schema';

@Injectable()
export class FavoriteService {
  private readonly logger = new Logger(FavoriteService.name);

  constructor(
    @InjectModel(Favorite.name)
    private favoriteModel: Model<FavoriteDocument>,
  ) {}

  async getAllFavorites(userId: string) {
    const userObjectId = new Types.ObjectId(userId);
    return this.favoriteModel
      .find({ user: userObjectId })
      .select('word')
      .exec();
  }

  async addToFavorites(userId: string, word: string) {
    const userObjectId = new Types.ObjectId(userId);

    this.logger.log(`Adicionando favorito: "${word}" para o usuário: ${userId}`);

    const exists = await this.favoriteModel.findOne({ user: userObjectId, word });

    if (exists) {
      this.logger.warn(`A palavra "${word}" já está nos favoritos.`);
      return { message: 'Palavra já favoritada.' };
    }

    const favorite = new this.favoriteModel({ word, user: userObjectId });
    const saved = await favorite.save();
    this.logger.log(`Favorito salvo: ${saved._id}`);
    return saved;
  }

  async removeFromFavorites(userId: string, word: string) {
    const userObjectId = new Types.ObjectId(userId);

    const result = await this.favoriteModel.findOneAndDelete({
      user: userObjectId,
      word,
    });

    if (!result) {
      this.logger.warn(`Não foi possível remover: "${word}" dos favoritos.`);
      return { message: 'Favorito não encontrado.' };
    }

    return { message: `Palavra "${word}" removida com sucesso dos favoritos.` };
  }
}
