import jwt from "jsonwebtoken";
import { config } from "dotenv";
import moment from "moment";
import { User } from "../../user/models/User";
import { tokenObject } from "../types/tokenObject";

config();

export const sign = (user: User): string => {
  const obj: tokenObject = {
    // TODO dot env configuration
    exp: moment().add(24, "hour").unix(),
    user,
  };

  const token = jwt.sign(obj, process.env.JWT_PRIVATE_KEY || "");
  return token;
};

export const verify = (token: string): tokenObject => {
  const decoded = jwt.verify(
    token,
    process.env.JWT_PRIVATE_KEY || ""
  ) as tokenObject;
  return decoded;
};
