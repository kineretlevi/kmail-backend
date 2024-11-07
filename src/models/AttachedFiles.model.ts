import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Email } from './Email.model';

@Entity()
export class AttachedFiles {
    @PrimaryGeneratedColumn("uuid") 
    id!: string;

    @Column({ type: "varchar", length: 255 })
    filename!: string;

    @Column({ type: "bytea" }) 
    fileContent!: Buffer;

    @ManyToOne(() => Email, (email) => email.attachedFile, {
        onDelete: "CASCADE", // Delete attached files if the associated email is deleted
    })
    email!: Email;
}