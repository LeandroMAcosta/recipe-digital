
import { AuthChecker } from "type-graphql";
import { ApolloError } from "apollo-server-express";
import { isExpired } from "../../utils";
import { Context } from "../../utils/context";
import { verify } from "../utils/jwt";
import { User } from "../../user/models/User";
import { tokenObject } from "../types";

const authChecker: AuthChecker = ({ context }): boolean => {
  const { token } = context as Context;
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
  // Retreive Token

  const tokenValue = token.split(" ")[1];
  if (!tokenValue) {
    throw new ApolloError(
      "Invalid authorization header, Format must be Bearer <jwt>",
      "BAD TOKEN"
    );
  }
  // Validate token
  // Decrypt token
  const tokenData: tokenObject = verify(tokenValue);
  return isExpired(tokenData.exp);
};

export default authChecker;