import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User extends Document {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 25, description: 'The age of the user' })
  @Prop()
  age: number;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  @Prop({ required: true, unique: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
