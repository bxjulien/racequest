import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { RaceEventSubscription } from './race-event-subscription';

@Entity({ name: 'RaceEventSubscriptionResults' })
export class RaceEventSubscriptionResult {
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
    () => RaceEventSubscription,
    (RaceEventSubscription) => RaceEventSubscription.results,
  )
  raceEventSubscription: RaceEventSubscription;
}
