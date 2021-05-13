import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Car } from './Car'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  // optional
  @Column()
  firstName: string;

  // optional
  @Column()
  lastName: string;

  // optional
  @Column()
  license: number;

  @OneToMany(type => Car, car => car.userId)
  cars: Car[];
}
