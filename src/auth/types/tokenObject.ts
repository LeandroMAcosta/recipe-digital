import { User } from "../../user/models/User";

export type tokenObject = {
  user: User;
  exp: number;
};
