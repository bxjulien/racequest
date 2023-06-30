import {
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsPositive,
} from 'class-validator';

import { TrackDirection } from '../enums/track-direction.enum';
import { Type } from 'class-transformer';

export class AutoTrackDto {
  @Type(() => Number)
  @IsLongitude()
  longitudeStart: number;

  @Type(() => Number)
  @IsLatitude()
  latitudeStart: number;

  @Type(() => Number)
  @IsPositive()
  distance: number;

  @IsOptional()
  @IsEnum(TrackDirection)
  direction: TrackDirection;
}
