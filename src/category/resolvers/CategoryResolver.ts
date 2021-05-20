import {
  Mutation,
  Query,
  Resolver,
  Arg,
  Int,
} from "type-graphql";
import { CategoryInput } from "../models/inputs/CategoryInput";
import { CategoryUpdateInput } from "../models/inputs/CategoryUpdateInput";
import { Category } from "../models/Category";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";

@Service()
@Resolver()
export class CategoryResolver {
  
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
  ) {}
  
  @Query(() => [Category])
  async getCategories() {
    return await this.categoryRepository.find();
  }

  @Mutation(() => Category)
  async createCategory(
    @Arg("categoryInput", () => CategoryInput) categoryInput: CategoryInput
  ) {
    const newCategory = Category.create(categoryInput);
    return await newCategory.save();
  }

  @Mutation(() => Boolean)
  async updateCategory(
    @Arg("id", () => Int) id: number,
    @Arg("fields", () => CategoryUpdateInput) fields: CategoryUpdateInput
  ) {
    await Category.update({ id }, fields);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg("id", () => Int) id: number) {
    await Category.delete(id);
    return true;
  }
}
