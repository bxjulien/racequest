import {
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TraceDirection } from '../enums/trace-direction.enum';

export class CreateTraceDto {
  @Type(() => Number)
  @IsLongitude()
  longitude: number;

  @Type(() => Number)
  @IsLatitude()
  latitude: number;

  @Type(() => Number)
  @IsPositive()
  distance: number;

  @IsOptional()
  @IsEnum(TraceDirection)
  direction: TraceDirection;
}
