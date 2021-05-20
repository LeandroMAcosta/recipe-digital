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

    const category: Category = await this.categoryService.getOneCategory(
      categoryId
    );

    const newRecipe: Recipe = this.recipeRepository.create({
      owner: user,
      category,
      name,
      description,
      ingredients,
    });

    return await this.recipeRepository.save(newRecipe);
  }

  // TODO: check ownership
  async updateRecipe(user: User, id: number, fields: RecipeUpdateInput) {
    return await this.recipeRepository.update(
      {
        id,
        owner: { id: user.id },
      },
      fields
    );
  }

  // TODO: check ownership
  async deleteRecipe(user: User, id: number) {
    return await this.recipeRepository.delete({
      id,
      owner: { id: user.id },
    });
  }
}
