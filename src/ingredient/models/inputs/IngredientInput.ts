import { MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class IngredientInput {
  
  @Field()
  @MaxLength(30)
  item!: string;

  @Field()
  quantity!: number;

  @Field()
  unit!: string;

}
