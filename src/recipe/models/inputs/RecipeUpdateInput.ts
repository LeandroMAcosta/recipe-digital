import { Field, InputType } from "type-graphql";
import { IngredientInput } from "../../../ingredient/models/inputs/IngredientInput";

@InputType()
export class RecipeUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => [IngredientInput], { nullable: true })
  ingredients?: IngredientInput[];
}
