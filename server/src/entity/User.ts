import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EncryptionTransformer } from 'typeorm-encrypted';
import { Post } from "./Post";
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column({
        select: false,
        transformer: new EncryptionTransformer({
            key: 'e41c966f21f9e157780246fff924e6a3feddd751f201304213b2f845d8841a61',
            algorithm: 'aes-256-cbc',
            ivLength: 16,
            iv: 'ff5ac19190424b1d88f9419ef949ae56'
        })
    })
    password: string;

    @Column({ default: false })
    admin: boolean;

    @Column({ default: false })
    blocked: boolean;

    @Column({ nullable: true })
    imageUrl: string | undefined;

    @OneToMany(() => Post, p => p.user)
    posts: Post[]

}
