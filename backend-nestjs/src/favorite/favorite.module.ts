import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoriteService } from './favorite.service';
import { Favorite, FavoriteSchema } from './schemas/favorite.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Favorite.name, schema: FavoriteSchema }])
  ],
  providers: [FavoriteService],
  exports: [FavoriteService],
})
export class FavoriteModule {}
