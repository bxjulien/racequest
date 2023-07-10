import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RaceEvent } from './race-event';
import { RaceEventRunnerResult } from './race-event-runner-result';
import { User } from './user.model';

@Entity({ name: 'RaceEventRunners' })
export class RaceEventRunner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ type: 'float' })
  duration: number;

  /* RELATIONS */

  @ManyToOne(() => RaceEvent, (raceEvent) => raceEvent.raceEventRunners)
  raceEvent: RaceEvent;

  @ManyToOne(() => User, (user) => user.raceEventRunners)
  user: User;

  @OneToMany(() => RaceEventRunnerResult, (result) => result.raceEventRunner)
  results: RaceEventRunnerResult;
}
