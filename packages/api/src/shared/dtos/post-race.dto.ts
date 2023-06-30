import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

import { TrackDto } from './track.dto';
import { Type } from 'class-transformer';

export class PostRaceDto {
  @Type(() => TrackDto)
  @IsNotEmpty()
  @IsNotEmptyObject()
  race: TrackDto;

  @IsNumber()
  @IsPositive({ message: 'closingIn should be positive.' })
  closingIn: number;

  @IsString()
  @IsNotEmpty({ message: 'name should not be empty.' })
  name: string;
}
