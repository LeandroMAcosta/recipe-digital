import {
  Mutation,
  Query,
  Resolver,
  Arg,
  Int,
  Authorized,
  Ctx,
} from "type-graphql";
import { Service } from "typedi";
import { Context } from "../../utils";
import { RecipeInput } from "../models/inputs/RecipeInput";
import { RecipeUpdateInput } from "../models/inputs/RecipeUpdateInput";
import { Recipe } from "../models/Recipe";
import RecipeService from "../services/RecipeService";

@Service()
@Resolver()
export class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) {}

  @Query(() => [Recipe])
  getRecipes() {
    return this.recipeService.getRecipes();
  }

  @Authorized()
  @Query(() => Recipe)
  getOneRecipes(@Arg("id", () => Int) id: number) {
    return this.recipeService.getOneRecipe(id);
  }

  @Authorized()
  @Mutation(() => Recipe)
  createRecipe(
    @Ctx() context: Context,
    @Arg("recipeInput", () => RecipeInput)
    { name, description, ingredients, categoryId }: RecipeInput
  ) {
    return this.recipeService.createRecipe(
      context.user,
      name,
      description,
      ingredients,
      categoryId
    );
  }

  @Authorized()
  @Mutation(() => Recipe)
  updateRecipe(
    @Ctx() context: Context,
    @Arg("id", () => Int) id: number,
    @Arg("fields", () => RecipeUpdateInput) fields: RecipeUpdateInput
  ) {
    return this.recipeService.updateRecipe(context.user, id, fields);
  }

  @Authorized()
  @Mutation(() => Boolean)
  deleteCategory(@Ctx() context: Context, @Arg("id", () => Int) id: number) {
    this.recipeService.deleteRecipe(context.user, id);
    return true;
  }
}
