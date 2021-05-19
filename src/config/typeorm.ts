import { createConnection } from "typeorm";
import path from "path";

export async function connect() {
  await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    database: "recipe_db",
    username: "recipe",
    password: "r3c1p3",
    entities: [path.join(__dirname, "../recipe/models/**.ts")],
    synchronize: true,
  });
  console.log("DB conected");
}
