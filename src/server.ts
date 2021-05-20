import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { RecipeResolver } from "./recipe/resolvers/RecipeResolver";
import { CategoryResolver } from "./category/resolvers/CategoryResolver";
import { AuthenticationResolver } from "./auth/resolvers/AuthResolver";
import authChecker from "./auth/checkers/authChecker";
import jwt from "express-jwt";
import { Context } from "./utils";
import { config } from "dotenv";

config();

export async function startServer() {
  const app = express();
  const path = "/graphql";

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RecipeResolver, CategoryResolver, AuthenticationResolver],
      authChecker: authChecker,
    }),
    context: ({ req, res }) => {
      const context: Context = {
        req,
        res,
        token: req.headers.authorization || "",
      };
      return context;
    },
  });

  app.use(
    path,
    jwt({
      credentialsRequired: false,
      secret: process.env.JWT_PRIVATE_KEY || "",
      algorithms: ["HS256"],
    })
  );

  server.applyMiddleware({ app, path });

  return app;
}
