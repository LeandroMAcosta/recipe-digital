import {
  Mutation,
  Query,
  Resolver,
  Arg,
  InputType,
  Field,
  Int,
} from "type-graphql";
import { CategoryInput } from "../models/inputs/CategoryInput";
import { CategoryUpdateInput } from "../models/inputs/CategoryUpdateInput";
import { Category } from "../models/Category";

@Resolver()
export class CategoryResolver {
  @Query(() => [Category])
  async getCategories() {
    return await Category.find();
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
