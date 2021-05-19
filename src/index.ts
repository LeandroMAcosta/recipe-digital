import "reflect-metadata";
import { startServer } from "./server";
import { connect } from "./config/typeorm";

async function main() {
  await connect();
  const app = await startServer();
  app.listen(3000);
  console.log("Start server on port ", 3000);
}

main();
