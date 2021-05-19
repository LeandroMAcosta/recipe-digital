import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { RecipeResolver } from "./recipe/resolvers/RecipeResolver";

export async function startServer() {
  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RecipeResolver],
    })
  });

  server.applyMiddleware({ app, path: "/graphql" });

  return app;
}
