import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Race } from './race.model';
import { RaceEventRunner } from './race-event-runner';

@Entity({ name: 'RaceEvents' })
export class RaceEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  editionCount: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ default: false })
  hasEnded: boolean;

  /* RELATIONS */

  @ManyToOne(() => Race, (race) => race.raceEvents)
  race: Race;

  @OneToMany(
    () => RaceEventRunner,
    (raceEventRunner) => raceEventRunner.raceEvent,
  )
  raceEventRunners: RaceEventRunner[];
}
