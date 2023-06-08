import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
} from 'class-validator';

import { Elevation } from '../types/elevation.type';
import { TraceDirection } from '../enums/trace-direction.enum';

export class Trace {
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
  geoJson: any;

  @IsNumber()
  distance: number;

  @IsEnum(TraceDirection)
  direction: TraceDirection;

  geohash: string;

  elevation: Elevation;

  @IsNumber()
  closingIn: number;

  @IsDate()
  closingAt: Date;
}
