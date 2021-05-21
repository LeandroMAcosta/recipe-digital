import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Recipe } from "../../recipe/models/Recipe";
import { Ingredient } from "../models/Ingredient";
import { IngredientInput } from "../models/inputs/IngredientInput";

@Service()
export default class AuthService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>
  ) {}

  async createFromRecipe(recipe: Recipe, ingredients: IngredientInput[]) {
    for await (const ingredient of ingredients) {
      await this.ingredientRepository.save({
        recipe: recipe,
        ...ingredient
      });
    }
  }

  async removeFromRecipe(recipe: Recipe) {
    if (recipe.ingredients) {
      await this.ingredientRepository.remove(recipe.ingredients!);
    }
  }
}
