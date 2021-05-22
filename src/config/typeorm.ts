import { createConnection, useContainer } from "typeorm";
import path from "path";
import Container from "typedi";

export async function connect() {
  useContainer(Container);

  await createConnection({
    type: "mysql",
    host: process.env.HOST || "localhost",
    database: process.env.DB || "recipe_db",
    username: process.env.DB_USER || "recipe",
    password: process.env.DB_PASS  || "r3c1p3",
    entities: [path.join(__dirname, "../**/models/**.ts")],
    synchronize: true,
    logging: false,
  });
  console.log("DB conected");
}
