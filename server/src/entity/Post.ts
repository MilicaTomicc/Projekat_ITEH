import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./Comment";
import { PostCategory } from "./PostCategory";
import { User } from "./User";


@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  postCategoryId: number;

  @Column()
  userId: number;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User, u => u.posts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => PostCategory)
  @JoinColumn({ name: 'postCategoryId' })
  postCategory: PostCategory;

  @OneToMany(() => Comment, c => c.post)
  comments: Comment[];
}