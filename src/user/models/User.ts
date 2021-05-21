import { Field, ID, ObjectType } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Category } from "../../category/models/Category";
import { Recipe } from "../../recipe/models/Recipe";

@Entity()
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Category, (category) => category.owner)
  categories!: Promise<Category[]>;

  @OneToMany(() => Recipe, (recipe) => recipe.owner, {
    cascade: true,
  })
  recipes!: Promise<Recipe[]>;

  @Field()
  @Column()
  name!: String;

  @Field()
  @Column({ unique: true })
  email!: String;

  @Field(() => String)
  @Column({ nullable: false })
  password!: string;
}
