import { TrackDirection } from '../enums/track-direction.enum';
import { Elevation } from './elevation.type';

export type Track = {
  longitudeStart: number,
  latitudeStart: number,
  longitudeCenter: number,
  latitudeCenter: number,
  geojson: any,
  distance: number,
  direction: TrackDirection,
  elevation: Elevation,
}





