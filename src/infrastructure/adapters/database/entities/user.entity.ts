import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ type: 'timestamp', update: false })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;
}
