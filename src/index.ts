import "reflect-metadata";
import { startServer } from "./server";
import { connect } from "./config/typeorm";

async function main() {
  await connect();
  const app = await startServer();
  app.listen({
    port: process.env.PORT || 3000
  });
  console.log("Start server on port ", process.env.PORT || 3000);
}

main();
