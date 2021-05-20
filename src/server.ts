import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { RecipeResolver } from "./recipe/resolvers/RecipeResolver";
import { CategoryResolver } from "./category/resolvers/CategoryResolver";
import { AuthenticationResolver } from "./auth/resolvers/AuthResolver";
import authChecker from "./auth/checkers/authChecker";
import jwt from "express-jwt";
import { Context } from "./utils";
import { config } from "dotenv";
import { decodeToken } from "./auth/utils/jwt";
import { User } from "./user/models/User";

config();

export async function startServer() {
  const app = express();
  // TODO mover a constants.ts
  const path = "/graphql";

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RecipeResolver, CategoryResolver, AuthenticationResolver],
      authChecker: authChecker,
      container: Container
    }),
    context: ({ req, res }) => {
      const token = req.headers.authorization;
      let user: User | undefined = undefined;
      if (token) user = decodeToken(token).user;
      
      const context: Context = {
        req,
        res,
        token,
        user,
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
