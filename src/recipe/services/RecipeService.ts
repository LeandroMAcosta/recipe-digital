import { UserInputError } from "apollo-server-express";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Category } from "../../category/models/Category";
import CategoryService from "../../category/services/CategoryService";
import { User } from "../../user/models/User";
import { RecipeUpdateInput } from "../models/inputs/RecipeUpdateInput";
import { Recipe } from "../models/Recipe";

@Service()
export default class AuthService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    private readonly categoryService: CategoryService
  ) {}

  async getRecipes() {
    return await this.recipeRepository.find();
  }

  async getOneRecipe(id: number) {
    return await this.recipeRepository.findOneOrFail(id);
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
    ingredients: string,
    categoryId: number
  ) {
    const category: Category | undefined = await this.categoryService.getOneCategory(
      categoryId
    );
    
    if (!category) {
      throw new UserInputError("Category not found.");
    }

    return await this.recipeRepository.save({
      owner: user,
      category,
      name,
      description,
      ingredients,
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

    // Update isn't returning the updated object, only partially
    // Find another way to return the updated object and
    // reduce access to the database.
    await this.recipeRepository.update(recipe.id, fields);
    return await this.recipeRepository.findOneOrFail({
      id: recipe.id,
    });
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
  }
}
