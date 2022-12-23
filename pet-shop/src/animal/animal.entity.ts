import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({name: 'Animals'})
export class Animal {
@PrimaryGeneratedColumn()
id: number;

@Column({ length: 500 })
name: string;

@Column()
price:number;

@Column({length: 500})
kind: string;

@Column()
age: number;
}
