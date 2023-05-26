import { IsEnum, IsNumber } from 'class-validator';

import { TraceDirection } from '../enums/trace-direction.enum';

export class Trace {
  id: number;

  @IsNumber()
  longitude: number;

  @IsNumber()
  latitude: number;

  geoJson: any;

  @IsNumber()
  distance: number;

  @IsEnum(TraceDirection)
  direction: TraceDirection;

  geohash: string;
}
