import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from 'typeorm';
import { User } from './User.model';

@Entity()
export class Contacts {
    @PrimaryGeneratedColumn("uuid") 
    id!: string;

    @Column({ type: "varchar", length: 30, unique: true })
    name!: string;

    @CreateDateColumn({ type: "timestamp" }) 
    createdAt!: Date;

    @ManyToMany(() => User, (user) => user.contacts)
    users!: User[];
}