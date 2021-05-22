import { createConnection, useContainer } from "typeorm";
import Container from "typedi";
import { Ingredient } from "../ingredient/models/Ingredient";
import { Category } from "../category/models/Category";
import { Recipe } from "../recipe/models/Recipe";
import { User } from "../user/models/User";

export async function connect() {
  useContainer(Container);
  await createConnection({
    type: "mysql",
    host: process.env.HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [User, Recipe, Category, Ingredient],
    synchronize: true,
    logging: false,
  });
  console.log("DB conected");
}
