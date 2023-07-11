import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RaceEvent } from './race-event';
import { RaceEventSubscriptionResult } from './race-event-subscription-result';
import { User } from './user.model';

@Entity({ name: 'RaceEventSubscriptions' })
export class RaceEventSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: new Date() })
  createdAt: Date;

  /* RELATIONS */

  @ManyToOne(() => RaceEvent, (raceEvent) => raceEvent.subscriptions)
  event: RaceEvent;

  @ManyToOne(() => User, (user) => user.subscribedEvents)
  user: User;

  @OneToMany(
    () => RaceEventSubscriptionResult,
    (result) => result.raceEventSubscription,
  )
  results: RaceEventSubscriptionResult;
}
