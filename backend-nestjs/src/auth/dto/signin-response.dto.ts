import { ApiProperty } from '@nestjs/swagger';

export class SigninResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  token: string;
}
