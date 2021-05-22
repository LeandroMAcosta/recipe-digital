import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { RecipeResolver } from "./recipe/resolvers/RecipeResolver";
import { CategoryResolver } from "./category/resolvers/CategoryResolver";
import { AuthenticationResolver } from "./auth/resolvers/AuthResolver";
import authChecker from "./auth/checkers/authChecker";
import { Context } from "./utils";
import { config } from "dotenv";
import { decodeToken, getTokenFromHeader } from "./auth/utils/jwt";
import { User } from "./user/models/User";

config();

export async function startServer() {
  const app = express();
  // TODO move to constants.ts or dotenv
  const path = "/graphql";

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RecipeResolver, CategoryResolver, AuthenticationResolver],
      authChecker: authChecker,
      container: Container
    }),
    context: ({ req, res }) => {
      const token = getTokenFromHeader(req.headers);
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

  server.applyMiddleware({ app, path });

  return app;
}
