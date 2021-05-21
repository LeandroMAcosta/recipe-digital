import { Field, ID, ObjectType } from "type-graphql";
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
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @ManyToOne(() => User, (user) => user.recipes, {
    eager: true,
    nullable: false,
  })
  owner!: User;

  @Field()
  @ManyToOne(() => Category, (category) => category.recipes, { eager: true })
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
