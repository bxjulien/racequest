import { IsNumber, IsString } from 'class-validator';

export class Race {
  @IsNumber()
  id: number;

  @IsNumber()
  trackId: number;

  @IsString()
  name: string;
}
