import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EntryDocument = Entry & Document;

@Schema()
export class Entry {
  @Prop({ required: true, unique: true })
  word: string;
}

export const EntrySchema = SchemaFactory.createForClass(Entry);
