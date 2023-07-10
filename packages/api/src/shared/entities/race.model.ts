import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RaceEvent } from './race-event';
import { Track } from './track.model';
import { User } from './user.model';

@Entity({ name: 'Races' })
export class Race {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  /* RELATION */

  @OneToOne(() => Track)
  @JoinColumn()
  track: Track;

  @OneToOne(() => User)
  @JoinColumn()
  creator: User;

  @OneToMany(() => RaceEvent, (raceEvent) => raceEvent.race)
  raceEvents: RaceEvent[];
}
