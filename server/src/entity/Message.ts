import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  senderId: number;

  @Column()
  receiverId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'receiverId' })
  receiver: User;
}