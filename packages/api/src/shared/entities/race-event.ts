import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Race } from './race.model';
import { RaceEventSubscription } from './race-event-subscription';

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

  @ManyToOne(() => Race, (race) => race.events)
  @JoinColumn()
  race: Race;

  @OneToMany(
    () => RaceEventSubscription,
    (RaceEventSubscription) => RaceEventSubscription.event,
  )
  subscriptions: RaceEventSubscription[];
}
