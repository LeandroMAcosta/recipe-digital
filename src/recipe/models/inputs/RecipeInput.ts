import { Field, InputType } from "type-graphql";

@InputType()
export class RecipeInput {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  ingredients!: string;

  @Field()
  categoryId!: number;
}
