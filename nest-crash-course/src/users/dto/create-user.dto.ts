import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(10)
  name: string;

  @ApiProperty({ required: false })
  age?: number;

  @IsAlphanumeric()
  @MaxLength(10)
  username: string;

  @MinLength(10)
  @MaxLength(50)
  password: string;
}
