import {
  Mutation,
  Query,
  Resolver,
  Arg,
  Int,
  Authorized,
  Ctx,
} from "type-graphql";
import { CategoryInput } from "../models/inputs/CategoryInput";
import { CategoryUpdateInput } from "../models/inputs/CategoryUpdateInput";
import { Category } from "../models/Category";
import { Service } from "typedi";
import CategoryService from "../services/CategoryService";
import { Context } from "../../utils";

@Service()
@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  getCategories() {
    return this.categoryService.getCategories();
  }

  @Query(() => Category)
  getOneCategory(@Arg("id", () => Int) id: number) {
    return this.categoryService.getOneCategory(id);
  }

  @Authorized()
  @Mutation(() => Category)
  createCategory(
    @Ctx() context: Context,
    @Arg("categoryInput", () => CategoryInput) categoryInput: CategoryInput
  ) {
    return this.categoryService.createCategory(
      context.user!,
      categoryInput.name
    );
  }

  @Authorized()
  @Mutation(() => Category)
  updateCategory(
    @Ctx() context: Context,
    @Arg("id", () => Int) id: number,
    @Arg("fields", () => CategoryUpdateInput) fields: CategoryUpdateInput
  ) {
    return this.categoryService.updateCategory(context.user!, id, fields);
  }

  @Authorized()
  @Mutation(() => Boolean)
  deleteCategory(@Ctx() context: Context, @Arg("id", () => Int) id: number) {
    return this.categoryService.deleteCategory(context.user!, id);
  }
}
