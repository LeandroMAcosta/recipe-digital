import { Service } from "typedi";
import { Like, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../../user/models/User";
import { CategoryUpdateInput } from "../models/inputs/CategoryUpdateInput";
import { Category } from "../models/Category";
import { UserInputError } from "apollo-server-express";
import { CategoryFilterArgs } from "../args/CategoryFilterArgs";

@Service()
export default class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async getCategories({ name }: CategoryFilterArgs) {
    if (name != undefined) {
      return await this.categoryRepository.find({
        where: {
          name: Like("%" + name + "%"),
        },
      });
    } else {
      return await this.categoryRepository.find();
    }
  }

  async getOneCategory(id: number) {
    const category: Category | undefined =
      await this.categoryRepository.findOne(id);
    if (!category) {
      throw new UserInputError("Category not found.");
    }
    return category;
  }

  async createCategory(owner: User, name: string) {
    return await this.categoryRepository.save({
      owner,
      name,
    });
  }

  async updateCategory(user: User, id: number, fields: CategoryUpdateInput) {
    const category: Category | undefined =
      await this.categoryRepository.findOne({
        owner: user,
        id,
      });

    if (!category) {
      throw new UserInputError("Category not found.");
    }

    await this.categoryRepository.save({
      id,
      ...fields,
    });
    return this.categoryRepository.findOne(id);
  }

  async deleteCategory(user: User, id: number) {
    const category: Category | undefined =
      await this.categoryRepository.findOne({
        owner: user,
        id,
      });

    if (!category) {
      throw new UserInputError("Category not found.");
    }
    await this.categoryRepository.delete(id);
    return true;
  }
}
