import { Track } from './track.type';

export type Race = {
  id: number;
  track: Track;
  closingAt: Date;
  name: string;
  distanceFrom?: number;
};
