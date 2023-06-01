import { IsEnum, IsNumber } from 'class-validator';

import { TraceDirection } from '../enums/trace-direction.enum';
import { Elevation } from '../types/elevation.type';

export class TraceDto {
  @IsNumber()
  longitudeStart: number;

  @IsNumber()
  latitudeStart: number;

  @IsNumber()
  longitudeCenter: number;

  @IsNumber()
  latitudeCenter: number;

  @IsNumber()
  distance: number;

  @IsEnum(TraceDirection)
  direction: TraceDirection;

  geoJson: any;

  elevation: Elevation;
}
