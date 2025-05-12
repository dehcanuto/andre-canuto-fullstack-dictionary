import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EntriesModule } from './entries/entries.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:admin@mongodb:27017/nestjs-auth', {
      authSource: 'admin',
    }),  
    UsersModule,
    AuthModule,
    EntriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
