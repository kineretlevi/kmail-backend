import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { AttachedFiles } from './AttachedFiles.model'

// Define email entity with connection of one to many to the attached files entity.
@Entity()
export class Email {
    @PrimaryGeneratedColumn("uuid") 
    id!: string;

    @Column({ type: "varchar", length: 30})
    sender!: string;

    @Column({ type: "varchar", length: 30}) 
    receiver!: string;

    @Column({ type: "varchar", length: 100 }) 
    subject!: string;

    @Column({ type: "varchar", length: 1000 }) 
    body!: string;

    @CreateDateColumn({ type: "timestamp" }) 
    createdAt!: Date;

    @OneToMany(() => AttachedFiles, (file) => file.email, {
        cascade: true, // Automatically save attached file when saving an email
    })
    attachedFile!: AttachedFiles[];
}