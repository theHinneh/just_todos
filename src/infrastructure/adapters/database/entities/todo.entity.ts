import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'completed';

  @Column({ type: 'timestamp' })
  dueDate: Date;

  @Column({ type: 'timestamp', update: false })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user: UserEntity): TodoEntity[] => user.todos)
  user: UserEntity;
}
