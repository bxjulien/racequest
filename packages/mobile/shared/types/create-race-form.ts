import { FormatType } from '../enums/FormatType.enum';
import { StartingPoint } from './starting-point.type';
import { Track } from './track.type';

export type CreateRaceForm = {
  format: FormatType;
  startingPoint: StartingPoint | null;
  track: Track | null;
  closingIn: number;
  name: string;
};
