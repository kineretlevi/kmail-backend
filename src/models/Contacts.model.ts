import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from 'typeorm';
import { User } from './User.model';

// Define attached contacts entity with connection of many to many to the user entity.
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