import { ArrayMinSize, IsArray, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IngredientInput } from "../../../ingredient/models/inputs/IngredientInput";

@InputType()
export class RecipeInput {
  
  @Field()
  @MaxLength(30)
  name!: string;

  @Field()
  description!: string;

  @Field(() => [IngredientInput], {nullable: false })
  @IsArray()
  @ArrayMinSize(1)
  ingredients!: IngredientInput[];

  @Field()
  categoryId!: number;
}
