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
  longitudeStart: number;

  @Type(() => Number)
  @IsLatitude()
  latitudeStart: number;

  @Type(() => Number)
  @IsPositive()
  distance: number;

  @IsOptional()
  @IsEnum(TraceDirection)
  direction: TraceDirection;
}
