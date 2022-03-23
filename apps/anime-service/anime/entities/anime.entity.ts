import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Status } from '@shared/enums/status.enum';

@Entity()
export class Anime {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @Column({ length: 30 })
  name: string;

  @Column()
  picture: string; //base64 string

  @Column()
  review: string;

  @Column({ type: 'enum', enum: Status, default: Status.PRESENT })
  status: Status;

  @CreateDateColumn({ type: 'timestamptz', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'timestamptz', name: 'end_date' })
  endDate: Date;
}
