import moment from "moment";
import jwt from "jsonwebtoken";
import { User } from "../../user/models/User";
import { tokenObject } from "../types/tokenObject";
import { tokenPayload } from "../types/tokenPayload";


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

export function decodeToken(token: string): tokenPayload {
  const decoded = jwt.verify(
    token,
    process.env.JWT_PRIVATE_KEY || ""
  ) as tokenPayload;
  return decoded;
}
