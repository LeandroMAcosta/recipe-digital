import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Recipe extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

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
}
