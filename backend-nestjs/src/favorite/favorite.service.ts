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
        return this.favoriteModel
            .find({ user: userId })
            .select('word')
            .exec();
    }

    async addToFavorites(userId: string, word: string) {
        const exists = await this.favoriteModel.findOne({ user: userId, word });
        if (exists) {
            return { message: "Error message" }
        }

        const favorite = new this.favoriteModel({ word, user: userId });
        return favorite.save();
    }

    async removeFromFavorites(userId: string, word: string) {
        const result = await this.favoriteModel.findOneAndDelete({ user: userId, word });

        if (!result) {
            return { message: "Error message" }
        }

        return { message: `Palavra "${word}" removida com sucesso dos favoritos.` };
    }
}
