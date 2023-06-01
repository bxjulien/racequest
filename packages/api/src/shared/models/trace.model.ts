import { IsEnum, IsNumber, IsOptional } from 'class-validator';

import { TraceDirection } from '../enums/trace-direction.enum';

export class Trace {
  @IsOptional()
  id?: number;

  @IsNumber()
  longitudeStart: number;

  @IsNumber()
  latitudeStart: number;

  @IsNumber()
  longitudeCenter: number;

  @IsNumber()
  latitudeCenter: number;

  @IsOptional()
  geoJson?: any;

  @IsNumber()
  distance: number;

  @IsEnum(TraceDirection)
  direction: TraceDirection;

  geohash: string;
}
