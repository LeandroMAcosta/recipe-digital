import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Category } from "../../category/models/Category";
import { Ingredient } from "../../ingredient/models/Ingredient";
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
    cascade: false,
  })
  owner!: User;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.recipes, {
    // lazy: false,
    eager: true,
    cascade: true,
    onDelete: "CASCADE",
  })
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

  @Field(() => [Ingredient], { nullable: true })
  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe, {
    eager: true,
    cascade: ["insert"],
  })
  ingredients!: Ingredient[];
}
