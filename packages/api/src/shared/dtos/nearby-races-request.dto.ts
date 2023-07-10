import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class NearbyRacesRequestDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  longitude: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  latitude: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  radius: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  maxDistance?: number;
}
