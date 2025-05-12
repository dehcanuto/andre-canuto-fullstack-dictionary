import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FavoriteDocument = Favorite & Document;

@Schema()
export class Favorite {
  @Prop()
  word: string;

  @Prop()
  definition: string;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
