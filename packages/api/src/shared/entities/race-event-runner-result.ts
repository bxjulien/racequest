import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { RaceEventRunner } from './race-event-runner';

@Entity({ name: 'RaceEventRunnerResults' })
export class RaceEventRunnerResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ type: 'float' })
  duration: number;

  /* RELATIONS */

  @ManyToOne(
    () => RaceEventRunner,
    (raceEventRunner) => raceEventRunner.results,
  )
  raceEventRunner: RaceEventRunner;
}
