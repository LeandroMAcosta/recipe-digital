import { User } from "../../user/models/User";

export type tokenPayload = {
  user: User;
  exp: number;
};
