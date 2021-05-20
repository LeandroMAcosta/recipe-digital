import { createConnection, useContainer } from "typeorm";
import path from "path";
import Container from "typedi";

export async function connect() {
  // TODO: usar variables de entorno
  useContainer(Container);
  await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    database: "recipe_db",
    username: "recipe",
    password: "r3c1p3",
    entities: [path.join(__dirname, "../**/models/**.ts")],
    synchronize: true,
  });
  console.log("DB conected");
}
