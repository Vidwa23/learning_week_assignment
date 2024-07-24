import { ApiProperty } from '@nestjs/swagger';

export class GithubAuthDto {
  @ApiProperty({
    example: 'github',
    description: 'The provider of the authentication',
  })
  readonly provider: string;
}
