import { IsEnum, IsNumber } from 'class-validator';

import { Elevation } from '../types/elevation.type';
import { TraceDirection } from '../enums/trace-direction.enum';

export class TraceDto {
  @IsNumber()
  longitudeStart: number;

  @IsNumber()
  latitudeStart: number;

  @IsNumber()
  longitudeCenter: number;

  @IsNumber()
  latitudeCenter: number;

  geoJson: any;

  @IsNumber()
  distance: number;

  @IsEnum(TraceDirection)
  direction: TraceDirection;

  elevation: Elevation;
}
