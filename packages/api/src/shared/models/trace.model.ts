import { IsEnum, IsNumber } from 'class-validator';
import { TraceDirection } from '../enums/trace-direction.enum';

export class Trace {
  @IsNumber()
  longitude: number;

  @IsNumber()
  latitude: number;

  geoJson: any;

  geo_json: any;

  @IsNumber()
  distance: number;

  @IsEnum(TraceDirection)
  direction: TraceDirection;
}
