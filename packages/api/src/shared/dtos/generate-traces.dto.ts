import {
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsPositive,
} from 'class-validator';

import { TraceDirection } from '../enums/trace-direction.enum';
import { Type } from 'class-transformer';

export class GenerateTracesDto {
  @Type(() => Number)
  @IsLongitude()
  longitude_start: number;

  @Type(() => Number)
  @IsLatitude()
  latitude_start: number;

  @Type(() => Number)
  @IsPositive()
  distance: number;

  @IsOptional()
  @IsEnum(TraceDirection)
  direction: TraceDirection;
}
