import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsEmail, Min } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 25, description: 'The age of the user' })
  @IsInt()
  @Min(0)
  readonly age: number;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  readonly email: string;
}
