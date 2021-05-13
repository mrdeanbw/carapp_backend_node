import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './User'

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lease: boolean;

  @Column()
  seats: number;

  @Column()
  year: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  trim: string;

  @Column()
  specs: string;

  @ManyToOne(type => User, user => user.id)
  userId: number;
}
