import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Contacts } from './Contacts.model';

// Define user entity with connection of many to meny to the contacts entity.
@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid") 
    id!: string;

    @Column({ type: "varchar", length: 30, unique: true })
    username!: string;

    @Column({ type: "varchar", length: 20 }) 
    password!: string;

    @ManyToMany(() => Contacts, (contact) => contact.users, {
        cascade: true, // Optional: Automatically update contacts when updating user
    })
    @JoinTable() // Creates a join table for the many-to-many relationship
    contacts!: Contacts[];
}