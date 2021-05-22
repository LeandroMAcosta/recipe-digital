import { UserInputError } from "apollo-server-express";
import { Service } from "typedi";
import { Like, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Category } from "../../category/models/Category";
import CategoryService from "../../category/services/CategoryService";
import { IngredientInput } from "../../ingredient/models/inputs/IngredientInput";
import IngredientService from "../../ingredient/services/IngredientService";
import { User } from "../../user/models/User";
import { RecipeFilterArgs } from "../args/RecipeFilterArgs";
import { RecipeUpdateInput } from "../models/inputs/RecipeUpdateInput";
import { Recipe } from "../models/Recipe";
import { removeUndefined } from "../../utils/removeUndefined";
import { Ingredient } from "../../ingredient/models/Ingredient";

@Service()
export default class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    private readonly categoryService: CategoryService,
    private readonly ingredientService: IngredientService
  ) {}

  private buildQuery({ name, categoryId }: RecipeFilterArgs) {
    let query = {
      name: name === undefined ? undefined : Like("%" + name + "%"),
      category: {
        id: categoryId,
      },
    };

    return removeUndefined(query);
  }

  async getRecipes(filters: RecipeFilterArgs) {
    const query = this.buildQuery(filters);
    let result = await this.recipeRepository.find({
      relations: ["category", "category.recipes"],
      where: {
        ...query,
      },
    });

    // Not the best solution, bad for RAM, this issue explain what happened to me
    // when I tried to filter with Repository/QueryBuilder: https://github.com/typeorm/typeorm/issues/4396
    if (filters.ingredient === undefined) {
      return result;
    }
    return result.filter((recipe) => {
      return recipe.ingredients.some((ingredient: Ingredient) => {
        return ingredient.item == filters.ingredient;
      });
    });
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
