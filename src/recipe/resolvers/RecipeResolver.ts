import {
  Mutation,
  Query,
  Resolver,
  Arg,
  Int,
  Authorized,
} from "type-graphql";
import { RecipeInput } from "../models/inputs/RecipeInput";
import { RecipeUpdateInput } from "../models/inputs/RecipeUpdateInput";
import { Recipe } from "../models/Recipe";

@Resolver()
export class RecipeResolver {

  @Authorized()
  @Query(() => [Recipe])
  async getRecipes() {
    return await Recipe.find();
  }

  @Mutation(() => Recipe)
  async createRecipe(
    @Arg("recipeInput", () => RecipeInput) recipeInput: RecipeInput
  ) {
    const newRecipe = Recipe.create(recipeInput);
    return await newRecipe.save();
  }

  @Mutation(() => Boolean)
  async updateRecipe(
    @Arg("id", () => Int) id: number,
    @Arg("fields", () => RecipeUpdateInput) fields: RecipeUpdateInput
  ) {
    await Recipe.update({ id }, fields);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg("id", () => Int) id: number) {
    await Recipe.delete(id);
    return true;
  }
}
