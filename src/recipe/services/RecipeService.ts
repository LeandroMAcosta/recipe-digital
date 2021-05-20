import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../../user/models/User";
import { RecipeUpdateInput } from "../models/inputs/RecipeUpdateInput";
import { Recipe } from "../models/Recipe";

@Service()
export default class AuthService {
  constructor(
    @InjectRepository(Recipe) private readonly recipeRepository: Repository<Recipe>
  ) {}

  async getRecipes() {
    return await this.recipeRepository.find();
  }

  async getOneRecipe(id: number) {
    return await this.recipeRepository.findOne(id);
  }

  async getMyRecipes(user: User) {
    // TODO
  }

  // TODO es la mejor forma de traer usuario?
  async createRecipe(
    user: User,
    name: string,
    description: string,
    ingredients: string,
    categoryId: number
  ) {
    // TODO: add category
    if (categoryId) if (user) user = user;
    const newRecipe: Recipe = this.recipeRepository.create({
      name,
      description,
      ingredients,
    });

    return await this.recipeRepository.save(newRecipe);
  }

  // TODO: check ownership
  async updateRecipe(id: number, fields: RecipeUpdateInput) {
    return await this.recipeRepository.update(id, fields);
  }

  // TODO: check ownership
  async deleteRecipe(id: number) {
    return await this.recipeRepository.delete(id);
  }
}
