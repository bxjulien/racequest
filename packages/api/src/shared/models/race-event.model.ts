import { IsDate, IsNumber } from 'class-validator';

export class RaceEvent {
  @IsNumber()
  id: number;

  @IsNumber()
  raceId: number;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}
