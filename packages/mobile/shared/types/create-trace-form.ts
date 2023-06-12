import { FormatType } from '../enums/FormatType.enum';
import { StartingPoint } from './starting-point.type';
import { Trace } from '../../../api/src/shared/models/trace.model';

export type CreateTraceForm = {
  format: FormatType;
  startingPoint: StartingPoint | null;
  trace: Trace | null;
  closingIn: number;
  name: string;
};
