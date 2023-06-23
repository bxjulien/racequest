import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
} from 'class-validator';

import { Elevation } from '../types/elevation.type';
import { TraceDirection } from '../enums/trace-direction.enum';

export class Trace {
  @IsNumber()
  id: number;

  @IsNumber()
  longitude_start: number;

  @IsNumber()
  latitude_start: number;

  @IsNumber()
  longitude_center: number;

  @IsNumber()
  latitude_center: number;

  @IsNotEmpty()
  @IsNotEmptyObject()
  geojson: any;

  @IsNumber()
  distance: number;

  @IsEnum(TraceDirection)
  direction: TraceDirection;

  geohash: string;

  elevation: Elevation;

  @IsNumber()
  closing_in: number;

  @IsDate()
  closing_at: Date;

  @IsString()
  name: string;
}
