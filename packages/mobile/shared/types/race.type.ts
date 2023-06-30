import { TrackDirection } from '../enums/track-direction.enum';
import { Elevation } from './elevation.type';
import { Track } from './track.type';

export type Race = {
  id: number;
  track: Track;
  closingAt: Date;
  name: string;
};
