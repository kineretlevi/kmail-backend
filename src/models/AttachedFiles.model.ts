import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Email } from './Email.model';

// Define attached files entity with connection of many to one to the email entity.
@Entity()
export class AttachedFiles {
    @PrimaryGeneratedColumn("uuid") 
    id!: string;

    @Column({ type: "varchar", length: 255 })
    filename!: string;

    @Column({ type: "bytea" }) 
    fileContent!: Buffer;

    @ManyToOne(() => Email, (email) => email.attachedFile, {
        // Delete attached files if the associated email is deleted
        onDelete: "CASCADE", 
    })
    email!: Email;
}