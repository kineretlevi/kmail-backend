import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { AttachedFiles } from './AttachedFiles'

@Entity()
export class Email {
    @PrimaryGeneratedColumn("uuid") 
    id!: string;

    @Column({ type: "varchar", length: 30, unique: true })
    sender!: string;

    @Column({ type: "varchar", length: 30, unique: true }) 
    receiver!: string;

    @Column({ type: "varchar", length: 100 }) 
    subject!: string;

    @Column({ type: "varchar", length: 1000 }) 
    body!: string;

    @CreateDateColumn({ type: "timestamp" }) 
    createdAt!: Date;

    @OneToOne(() => AttachedFiles, (file) => file.email, {
        cascade: true, // Automatically save attached file when saving an email
    })
    // Indicates that Email owns the relationship
    @JoinColumn() 
    attachedFile!: AttachedFiles;
}