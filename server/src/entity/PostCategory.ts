import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;
}