import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class AutoTrackRequestDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  longitudeStart: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  latitudeStart: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  distance: number;
}
