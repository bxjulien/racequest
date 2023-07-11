import { RaceEvent } from './race-event.type';
import { Track } from './track.type';
import { User } from './user/user';

export type Race = {
  id: number;
  track: Track;
  closingAt: Date;
  name: string;
  distanceFrom?: number;
  events: RaceEvent[];
  creator: User;
};
