import User from "./entity/User";

export type tokenObject = {
  user: User;
  exp: number;
};
