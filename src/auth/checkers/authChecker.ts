import { AuthChecker } from "type-graphql";
import { ApolloError } from "apollo-server-express";
import { isExpired } from "../../utils";
import { Context } from "../../utils/context";
import { decodeToken } from "../utils/jwt";

const authChecker: AuthChecker = ({ context }): boolean => {
  const { token } = context as Context;
  const tokenValue = token.split(" ")[1];
  if (!tokenValue) {
    throw new ApolloError(
      "Invalid authorization header, Format must be Bearer <jwt>",
      "BAD TOKEN"
    );
  }

  const { exp } = decodeToken(tokenValue);
  return isExpired(exp);
};

export default authChecker;
