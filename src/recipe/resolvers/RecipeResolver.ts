import {
  Mutation,
  Query,
  Resolver,
  Arg,
  Int,
  Authorized,
} from "type-graphql";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { RecipeInput } from "../models/inputs/RecipeInput";
import { RecipeUpdateInput } from "../models/inputs/RecipeUpdateInput";
import { Recipe } from "../models/Recipe";

@Service()
@Resolver()
export class RecipeResolver {
  
  constructor(
    @InjectRepository(Recipe) private readonly recipeRepository: Repository<Recipe>
  ) {}
  
  @Authorized()
  @Query(() => [Recipe])
  async getRecipes() {
    return await this.recipeRepository.find();
  }

  @Mutation(() => Recipe)
  async createRecipe(
    @Arg("recipeInput", () => RecipeInput) recipeInput: RecipeInput
  ) {
    const newRecipe = Recipe.create(recipeInput);
    return await this.recipeRepository.save(newRecipe);
  }

  @Mutation(() => Boolean)
  async updateRecipe(
    @Arg("id", () => Int) id: number,
    @Arg("fields", () => RecipeUpdateInput) fields: RecipeUpdateInput
  ) {
    await this.recipeRepository.update(id, fields);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg("id", () => Int) id: number) {
    await Recipe.delete(id);
    return true;
  }
}
