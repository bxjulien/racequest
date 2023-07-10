import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { Elevation } from '../types/elevation.type';

@Entity({ name: 'Tracks' })
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  longitudeStart: number;

  @Column({ type: 'float' })
  latitudeStart: number;

  @Column({ type: 'float' })
  longitudeCenter: number;

  @Column({ type: 'float' })
  latitudeCenter: number;

  @Column('json')
  geojson: any;

  @Column({ type: 'float' })
  distance: number;

  @Column('geometry', {
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  @Index({ spatial: true })
  geohash: string;

  @Column({ type: 'jsonb' })
  elevation: Elevation;
}
