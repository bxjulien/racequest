import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Track } from './track.model';

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
}
