import { Controller, Post, Body } from '@nestjs/common';

import { TraceService } from './trace.service';
import { CreateTraceDto } from '../../shared/dtos/create-trace.dto';
import { Trace } from '../../shared/models/trace.model';

@Controller('trace')
export class TraceController {
  constructor(private readonly traceService: TraceService) {}

  @Post()
  createTrace(@Body() createTraceDto: CreateTraceDto): Promise<Trace[]> {
    return this.traceService.createTrace(createTraceDto);
  }
}
