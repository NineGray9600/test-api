import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('users')
export class User {

    
    @PrimaryGeneratedColumn('uuid')
    userId: string | number;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName?: string;

    @Column({ unique: true, nullable: true })
    email?: string;

    @Column({ nullable: true })
    phoneNumber?: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
