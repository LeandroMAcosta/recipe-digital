import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Category } from "../../category/models/Category";
import { User } from "../../user/models/User";

@ObjectType()
@Entity()
export class Recipe {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.recipes)
  owner!: User;

  @ManyToOne(() => Category, category => category.recipes)
  category!: Category;

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
