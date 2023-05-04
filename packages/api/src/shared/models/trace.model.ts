import { TraceDirection } from '../enums/trace-direction.enum';

export class Trace {
  longitude: number;
  latitude: number;
  geoJson: any;
  distance: number;
  direction: TraceDirection;
}
