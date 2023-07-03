import { IsEnum, IsNumber } from 'class-validator';

import { Elevation } from '../types/elevation.type';
import { TrackDirection } from '../enums/track-direction.enum';

export class TrackDto {
  @IsNumber()
  longitudeStart: number;

  @IsNumber()
  latitudeStart: number;

  @IsNumber()
  longitudeCenter: number;

  @IsNumber()
  latitudeCenter: number;

  geojson: any;

  @IsNumber()
  distance: number;

  @IsEnum(TrackDirection)
  direction: TrackDirection;

  elevation: Elevation;
}
