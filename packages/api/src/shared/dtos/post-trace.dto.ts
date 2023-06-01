import { IsNumber, IsPositive, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Trace } from '../models/trace.model';

export class PostTraceDto {
  trace: Trace;

  @IsNumber()
  @IsPositive({ message: 'closingIn doit être un nombre positif.' })
  closingIn: number;
}
