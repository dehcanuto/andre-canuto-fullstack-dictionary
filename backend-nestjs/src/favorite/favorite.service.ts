import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite, FavoriteDocument } from './schemas/favorite.schema';

@Injectable()
export class FavoriteService {
    constructor(
        @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
    ) {}

    async getAllFavorites(userId: string) {
        return { message: `Busca todos os favoritos do ${userId}` };
    }

    async addToFavorites(userId: string, word: string) {
        return { message: `Palavra "${word}" adicionada no favoritos de ${userId}` };
    }

    async removeFromFavorites(userId: string, word: string) {
        return { message: `Palavra "${word}" removida do favoritos de ${userId}` };
    }
}
