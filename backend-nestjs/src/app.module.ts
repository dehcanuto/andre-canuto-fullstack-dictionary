import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EntriesModule } from './entries/entries.module';
import { HistoryModule } from './history/history.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://andrecanutoc:Od0SkIjtXWJ8sJWQ@cluster0.hfpqbqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),  
    UsersModule,
    AuthModule,
    EntriesModule,
    HistoryModule,
    FavoriteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
