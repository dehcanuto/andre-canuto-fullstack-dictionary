import { ApiProperty } from '@nestjs/swagger';

export class SigninResponseDto {
  @ApiProperty({ example: 'f3a10cec013ab2c1380acef' })
  id: string;

  @ApiProperty({ example: 'User 1' })
  name: string;

  @ApiProperty({ example: 'Bearer JWT.Token' })
  token: string;
}
