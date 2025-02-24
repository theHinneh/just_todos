import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TodoEntity } from './todo.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  firstname: string;

  @Column()
  @Index()
  lastname: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, unique: true })
  @Index()
  phone?: string;

  @Column({ type: 'timestamp', update: false })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => TodoEntity, (todo: TodoEntity): UserEntity => todo.user)
  todos: TodoEntity[];
}
