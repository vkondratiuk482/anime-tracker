import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  picture: string;

  @Column()
  review: string;

  @Column({ type: 'enum', enum: Status, default: Status.PRESENT })
  status: Status;

  @Column({ type: 'timestamptz', name: 'start_date', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamptz', name: 'end_date', nullable: true })
  endDate: Date;
}
