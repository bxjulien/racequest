import { IsNumber, IsPositive } from 'class-validator';
import { TraceDto } from './trace.dto';
import { Type } from 'class-transformer';

export class PostTraceDto {
  @Type(() => TraceDto)
  trace: TraceDto;

  @IsNumber()
  @IsPositive({ message: 'closingIn doit être un nombre positif.' })
  closingIn: number;
}
