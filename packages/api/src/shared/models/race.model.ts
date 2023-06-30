import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
} from 'class-validator';

import { Elevation } from '../types/elevation.type';
import { TrackDirection } from '../enums/track-direction.enum';

export class Race {
  @IsNumber()
  id: number;

  @IsNumber()
  longitudeStart: number;

  @IsNumber()
  latitudeStart: number;

  @IsNumber()
  longitudeCenter: number;

  @IsNumber()
  latitudeCenter: number;

  @IsNotEmpty()
  @IsNotEmptyObject()
  geojson: any;

  @IsNumber()
  distance: number;

  @IsEnum(TrackDirection)
  direction: TrackDirection;

  geohash: string;

  elevation: Elevation;

  @IsDate()
  closingAt: Date;

  @IsString()
  name: string;
}
