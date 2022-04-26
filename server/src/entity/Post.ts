import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./Comment";
import { PostCategory } from "./PostCategory";
import { User } from "./User";


@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User, u => u.posts)
  user: User;

  @ManyToOne(() => PostCategory)
  postCategory: PostCategory;

  @OneToMany(() => Comment, c => c.post)
  comments: Comment[];
}