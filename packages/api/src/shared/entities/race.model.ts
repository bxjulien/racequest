import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Track } from './track.model';
import { User } from './user.model';

@Entity({ name: 'races' })
export class Race {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => Track)
  @JoinColumn()
  track: Track;

  @OneToOne(() => User)
  @JoinColumn()
  creator: User;
}
