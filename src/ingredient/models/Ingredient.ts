import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from "typeorm";
import { Recipe } from "../../recipe/models/Recipe";

@ObjectType()
@Entity()
export class Ingredient {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  item!: string;

  @Field(() => Recipe)
  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients, { 
    nullable: false,
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({name: 'recipe_id'})
  recipe!: Recipe;

  @Field()
  @Column()
  quantity!: number;

  // It should be an enum kg | g | count etc.
  @Field()
  @Column()
  unit!: string;
}
