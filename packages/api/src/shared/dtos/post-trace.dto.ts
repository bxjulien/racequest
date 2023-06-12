import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

import { TraceDto } from './trace.dto';
import { Type } from 'class-transformer';

export class PostTraceDto {
  @Type(() => TraceDto)
  @IsNotEmpty()
  @IsNotEmptyObject()
  trace: TraceDto;

  @IsNumber()
  @IsPositive({ message: 'closingIn should be positive.' })
  closingIn: number;

  @IsString()
  @IsNotEmpty({ message: 'name should not be empty.' })
  name: string;
}
