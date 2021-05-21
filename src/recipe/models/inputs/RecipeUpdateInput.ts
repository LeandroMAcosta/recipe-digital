import { Field, InputType } from "type-graphql";
import { Ingredient } from "../../../ingredient/models/Ingredient";
import { Recipe } from "../Recipe";

@InputType()
export class RecipeUpdateInput implements Partial<Recipe>{
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Ingredient, { nullable: true })
  ingredients?: Ingredient[];

}
