import { IsNotEmpty, IsNotEmptyObject, IsNumber } from 'class-validator';

import { Elevation } from '../types/elevation.type';

export class Track {
  @IsNumber()
  id: number;

  @IsNumber()
  longitudeStart: number;

  @IsNumber()
  latitudeStart: number;

  @IsNumber()
  longitudeCenter: number;

  @IsNumber()
  latitudeCenter: number;

  @IsNotEmpty()
  @IsNotEmptyObject()
  geojson: any;

  @IsNumber()
  distance: number;

  geohash: string;

  elevation: Elevation;
}
