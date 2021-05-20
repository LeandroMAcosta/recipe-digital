import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Recipe {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Field()
  @Column()
  name!: String;

  @Field()
  @Column()
  description!: String;

  @Field()
  @Column()
  ingredients!: String;
}
