import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Category } from "../../category/models/Category";
import { Recipe } from "../../recipe/models/Recipe";

@Entity()
@ObjectType()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Category, category => category.owner)
  categories?: Category[];

  @OneToMany(() => Recipe, recipe => recipe.owner)
  recipes?: Recipe[];

  @Field()
  @Column()
  name!: String;

  @Field()
  @Column()
  email!: String;

  @Field(() => String)
  @Column({ nullable: false })
  password!: string;
}
