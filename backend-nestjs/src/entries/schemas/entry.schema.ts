import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EntryDocument = Entry & Document;

@Schema()
export class Entry {
  @Prop()
  word: string;

  @Prop()
  definition: string;
}

export const EntrySchema = SchemaFactory.createForClass(Entry);
