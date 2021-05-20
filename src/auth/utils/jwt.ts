import jwt from "jsonwebtoken";
import { config } from "dotenv";
import moment from "moment";
import { User } from "../../user/models/User";
import { tokenObject } from "../types";

config();

export const sign = (user: User): string => {
  const obj: tokenObject = {
    exp: moment().add(1, "hour").unix(),
    user,
  };
  // TODO cambiar a dotenv
  const token = jwt.sign(obj, "super-secret-key" as string);
  return token;
};

export const verify = (token: string): tokenObject => {
  console.log(token);
  // TODO usar dotenv
  const decoded = jwt.verify(
    token,
    "super-secret-key" as string
  ) as tokenObject;
  console.log("DESPUES");
  return decoded;
};