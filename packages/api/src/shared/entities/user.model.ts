import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Race } from './race.model';
import { RaceEventSubscription } from './race-event-subscription';
import { Role } from '../enums/role.enum';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  pp: string;

  @Column({ default: Role.User })
  role: string;

  @Column({ default: true })
  isActive: boolean;

  /* RELATIONS */

  @OneToMany(() => Race, (race) => race.creator)
  createdRaces: Race[];

  @OneToMany(
    () => RaceEventSubscription,
    (RaceEventSubscription) => RaceEventSubscription.user,
  )
  subscribedEvents: RaceEventSubscription[];
}
