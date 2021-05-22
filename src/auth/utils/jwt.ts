import moment from "moment";
import jwt from "jsonwebtoken";
import { User } from "../../user/models/User";
import { tokenObject } from "../types/tokenObject";
import { tokenPayload } from "../types/tokenPayload";
import { IncomingHttpHeaders } from "http";
import { ApolloError } from "apollo-server-express";

export function generateToken(user: User): tokenObject {
  const expiration = moment().add(24, "hour").unix();
  const tokenPayload: tokenPayload = {
    user,
    exp: expiration,
  };

  const token: string = jwt.sign(
    tokenPayload,
    process.env.JWT_PRIVATE_KEY || ""
  );
  return { token, expiration };
}

export function getTokenFromHeader(
  headers: IncomingHttpHeaders
): string | undefined {
  const authorization: string | undefined = headers.authorization;
  if (!authorization) return undefined;
  if (!authorization.startsWith("Bearer ")) {
    throw new ApolloError(
      "Invalid authorization header, Format must be Bearer <jwt>",
      "BAD TOKEN"
    );
  }
  const token: string = authorization.split(" ")[1];

  if (token != "") {
    return token;
  } else {
    return undefined;
  }
}

export function decodeToken(token: string): tokenPayload {
  const tokenPayload = jwt.verify(
    token,
    process.env.JWT_PRIVATE_KEY || ""
  ) as tokenPayload;
  return tokenPayload;
}
