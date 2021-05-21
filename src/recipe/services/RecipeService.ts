import { UserInputError } from "apollo-server-express";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Category } from "../../category/models/Category";
import CategoryService from "../../category/services/CategoryService";
import { Ingredient } from "../../ingredient/models/Ingredient";
import { IngredientInput } from "../../ingredient/models/inputs/IngredientInput";
import IngredientService from "../../ingredient/services/IngredientService";
import { User } from "../../user/models/User";
import { RecipeUpdateInput } from "../models/inputs/RecipeUpdateInput";
// import { RecipeUpdateInput } from "../models/inputs/RecipeUpdateInput";
import { Recipe } from "../models/Recipe";

@Service()
export default class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    private readonly categoryService: CategoryService,
    private readonly ingredientService: IngredientService
  ) {}

  async getRecipes() {
    return await this.recipeRepository.find();
  }

  async getOneRecipe(id: number) {
    const recipe: Recipe | undefined = await this.recipeRepository.findOne(id);
    if (!recipe) {
      throw new UserInputError("Recipe not found.");
    }
    return recipe;
  }

  async getMyRecipes(user: User) {
    return this.recipeRepository.find({
      owner: {
        id: user.id,
      },
    });
  }

  async createRecipe(
    user: User,
    name: string,
    description: string,
    ingredientsInput: IngredientInput[],
    categoryId: number
  ) {
    const category: Category | undefined =
      await this.categoryService.getOneCategory(categoryId);

    if (!category) {
      throw new UserInputError("Category not found.");
    }

    return await this.recipeRepository.save({
      owner: user,
      category,
      name,
      description,
      ingredients: ingredientsInput,
    });
  }

  async updateRecipe(user: User, id: number, fields: RecipeUpdateInput) {
    let recipe: Recipe | undefined = await this.recipeRepository.findOne({
      id,
      owner: { id: user.id },
    });

    if (!recipe) {
      throw new UserInputError("Recipe not found.");
    }

    if (fields.ingredients != null) {
      const ingredients: IngredientInput[] = fields.ingredients!;
      delete fields.ingredients;
      await this.ingredientService.removeFromRecipe(recipe);
      await this.ingredientService.createFromRecipe(recipe, ingredients);
    }
    await this.recipeRepository.update(id, fields);

    return await this.recipeRepository.findOne(id);

  }

  async deleteRecipe(user: User, id: number) {
    const recipe: Recipe | undefined = await this.recipeRepository.findOne({
      id,
      owner: { id: user.id },
    });
    if (!recipe) {
      throw new UserInputError("Recipe not found.");
    }
    await this.recipeRepository.delete(id);
    return true;
  }
}
