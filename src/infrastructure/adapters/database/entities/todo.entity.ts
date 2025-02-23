import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'completed';

  @Column({ type: 'timestamp' })
  dueDate: Date;
}
